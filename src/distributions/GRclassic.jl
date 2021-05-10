"""
	GRclassic(b, M0)

The classic Gutenberg-Richter law can be expressed as an exponential distribution with
rate β and location `M0`:  

```math
f(x; \\beta, M_{0}) = \\beta e^{-\\beta (x-M_{0})}, \\quad x ≥ M_{0}
```

`M0` is the minimum magnitude. β and the b-value `b` are linked by the following relation: ``\\beta = blog(10)``.

```julia
GRclassic(1.0, 0.5)  # distribution with a b-value of 1 and minimum magnitude of 0.5
bvalue(d)     #  get the b-value
rate(d)       #  get β
location(d)   #  get M0
params(d)     #  get the parameters (b, M0)
```

"""
struct GRclassic{T,S<:Real} <: ContinuousUnivariateDistribution
    b::T   
    M0::S
    GRclassic(b::T, M0::S) where {T,S} = new{T,S}(b, M0)
end

bvalue(d::GRclassic) = d.b
avalue(d::GRclassic, N::Real, ΔM::Real) = log10(N) + d.b*( location(d)+ΔM/2 )


Distributions.rate(d::GRclassic) = d.b*log(10) 
Distributions.location(d::GRclassic) = d.M0
Distributions.params(d::GRclassic) = (d.b, d.M0)

Distributions.mean(d::GRclassic) = 1/rate(d) + d.M0

#### Evaluation
Distributions.zval(d::GRclassic, x::Real) = (x .- d.M0) * rate(d)
Distributions.xval(d::GRclassic, z::Real) = (z * 1/rate(d)) + d.M0

Distributions.pdf(d::GRclassic, x::Real)    = x ≥ d.M0 ?  (rate(d) * exp(-rate(d) * (x-d.M0))) : zero(0.0)
Distributions.logpdf(d::GRclassic, x::Real) = x ≥ d.M0 ? log(rate(d)) - rate(d) * (x-d.M0) : -Inf


Distributions.cdf(d::GRclassic, x::Real)    = x ≥ d.M0 ? -expm1(-Distributions.zval(d, x)) : zero(0.0)
Distributions.logcdf(d::GRclassic, x::Real) = x ≥ d.M0 ? log( -expm1(-Distributions.zval(d, x)) ) : -Inf


Distributions.ccdf(d::GRclassic, x::Real)   = x ≥ d.M0 ?    exp(-Distributions.zval(d, x)) : zero(0.0)
Distributions.logccdf(d::GRclassic, x::Real) = x ≥ d.M0 ? -Distributions.zval(d, x) : -Inf


#### Sampling
Distributions.rand(rng::AbstractRNG, d::GRclassic) = Distributions.xval(d, randexp(rng))



"""
    fit_mle(D::Type{<:GRclassic}, mags, M0)

Use the maximum likelihood method to determine the `GRclassic` distribution fitting the 
input data. The function calculates the b-value with the method of Aki-Utsu.

# Arguments
* `D`: distribution type (see [`GRclassic(b, M0)`](@ref)).
* `mags`: array storing magnitude values greater than or equal to the magnitude of completeness `M0`. 
* `M0`: magnitude of completeness. See [Magnitude of completeness](@ref) for 
    methods that can be used to estimate it.

The standard error affecting the b-value can be estimated with [`fit_stderr(D::Type{<:GRclassic}, mags)`](@ref)

# References
* Aki, 1965. Maximum Likelihood Estimate of b in the Formula logN=a-bM and its Confidence Limits.
  Belletin of the Earthquake Research Institute, 43, 237-239.
* Utsu 1966. A Statistical Significance Test of the Difference in b-value between Two Earthquake Groups.
  Journal of Physics of the Earth, 14, 37-40.
"""
function Distributions.fit_mle(::Type{<:GRclassic}, mags::AbstractArray{<:AbstractFloat}, M0::Real) 

    μ = mean(mags)
    β = 1 / (μ - M0)

    return GRclassic(β/log(10), M0)
end



"""
    fit_binned(D::Type{<:GRclassic}, mags, M0, ΔM)

Determine the `GRclassic` distribution fitting the input data. 
This function corresponds to the method of Tinti and Mulargia, which was designed
to properly estimate the b-value from binned magnitude values.

# Arguments
* `D`: distribution type (see [`GRclassic(b, M0)`](@ref)).
* `mags`: array storing binned magnitude values greater than or equal to the magnitude of completeness `M0`
* `M0`: magnitude of completeness. See [Magnitude of completeness](@ref) for methods that 
   can be used to estimate it.
* `ΔM`: bin width used to group the magnitude values.`


The standard error affecting the b-value can be estimated with [`fit_stderrbinned(D::Type{<:GRclassic}, mags, ΔM)`](@ref)

# References
* Tinti and Mulargia, 1987. Confidence intervals of b values for grouped magnitudes. 
  Bulletin of the Seismological Society of America, 77 (6), 2125–2134. 
"""
function fit_binned(::Type{<:GRclassic}, mags::AbstractArray{<:AbstractFloat}, M0::Real, ΔM::Real) 

    μ = mean(mags)

    z = (μ - M0)/ΔM - 0.5
    p = z/(z+1)
    β = -log(p) / ΔM

    return GRclassic(β/log(10), M0)

end


"""
    fit_stderr(D::Type{<:GRclassic}, mags)

Apply the method of Shi and Bolt to calculate the standard error affecting a b-value
determined with the method of Aki-Utsu [`fit_mle(D::Type{<:GRclassic}, mags, M0)`](@ref). 

# Arguments
* `D`: distribution type (see [`GRclassic(b, M0)`](@ref)).
* `mags`: array storing magnitude values greater than or equal to the magnitude of completeness.

# References
* Shi and Bolt, 1982. The standard error of the magnitude-frequency b value.
  Bulletin of the Seismological Society of America, 72, 1677-1687.
"""
function fit_stderr(d::GRclassic, mags::AbstractVector{T}) where {T<:Real}

    μ = mean(mags)  
    N = length(mags) 

    σ = (sum((mags .- μ).^2)) / (N*(N-1))
    σ = 2.30 * sqrt(σ) * bvalue(d)^2

    return σ

end


"""
    fit_stdbinned(D::Type{<:GRclassic}, mags, ΔM)

Calculate the standard error affecting a b-value estimated with the
method of Tinti and Mulargia ([`fit_binned(D::Type{<:GRclassic}, mags, M0, ΔM)`](@ref)).

# Arguments
* `D`: distribution type (see [`GRclassic(b, M0)`](@ref)).
* `mags`: array storing magnitude values greater than or equal to the magnitude of completeness.
* `ΔM`: bin width used to group the magnitude values.`

# References
* Tinti and Mulargia, 1987. Confidence intervals of b values for grouped magnitudes. 
  Bulletin of the Seismological Society of America, 77 (6), 2125–2134. 
"""
function fit_stderrbinned(d::GRclassic, mags::AbstractVector{T}, ΔM::S) where {T,S<:Real}

    μ = mean(mags)  
    N = length(mags) 

    z = (μ - (d.M0))/ΔM - 0.5
    p = z/(z+1)
    σ = (1-p)/(log(10)*ΔM*sqrt(N*p))

    return σ

end


