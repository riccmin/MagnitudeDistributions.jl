# How-to: Magnitude of completeness 

## Input magnitudes

The input magnitudes are obtained by randomly sampling an exponential distribution (see 
[`GRclassic(b, M0)`](@ref)). 

```julia-repl
julia> using MagnitudeDistributions, Random, Distributions

julia> Random.seed!(10) # to make results reproducible

julia> b = 1.0    # b-value
1.0

julia> M0 = 0.5   # minimum magnitude
0.5

julia> N = 100000 # number of samples
100000

julia> mags = rand(GRclassic(b,M0), 100000)
100000-element Vector{Float64}:
 0.6547030177365674
 0.8281037053138567
 0.7333794310588824
 0.5297096511820081
 0.6157440864903895
 0.6853284272158914
 0.6770055323153921
 1.4078926858640064
 0.8328259467173961
 0.5970215201942995
 ⋮
 0.5477099988280166
 0.6028098601689204
 0.6851950631472131
 2.827905395338248
 0.9037936556932051
 0.6591458976137341
 0.7174070167764743
 0.537132931002749
 0.6651972372624756
```

To reproduce the incompleteness of real catalogs, a [thinning operation](https://en.wikipedia.org/wiki/Point_process_operation#Thinning) 
is applied. The thinning is based on the cumulative function of a normal distribution.

```julia-repl
julia> μ = 1.0  # mean
1.0

julia> σ = 0.1  # standard deviation
0.1

julia> filter!(x->rand() < cdf(Normal(μ,σ),x), mags)
32461-element Vector{Float64}:
 1.4078926858640064
 1.4474394687089862
 1.2115808713475444
 1.2058593230448573
 1.144583351332513
 1.148826610875833
 1.2266957747843135
 1.3299669337721514
 1.3361863582881437
 0.8173338374496064
 ⋮
 1.1869995074569266
 1.2148002763177803
 1.186895006733359
 1.5476802837961292
 0.9156626400345742
 1.2790798393496807
 2.3665513040522095
 1.1021995425749411
 2.827905395338248

```

## Estimation

The magnitude of completeness can be estimated with different algorithms (see [Magnitude of completeness](@ref)). 
All of them are based on binned magnitudes, so it is necessary to specify the width of the bins.

```julia
julia> ΔM = 0.05      # bin width
0.05

julia> Mcmc = maxcurv(mags, ΔM)  # maximum curvature
1.112024271406315

julia> Mcmbass = mbass(mags, ΔM) # segment slope
1.2120242714063152

julia> Mcmbs = mbs(mags, ΔM)     # b-value stability
1.2120242714063152

```

The magnitude of completeness can be used to select the complete part of the catalog.  

!!! note

    The magnitude of completeness ``M_{c}`` given by `maxcurv`, `mbass` and `mbs` refers to 
    the center of the bin. This means that the catalog is complete starting from ``M_{c}-ΔM/2``.


If the maximum curvature method is chosen:

```julia-repl
julia> magscomplete = mags[mags .>= Mcmc - ΔM/2]
25200-element Vector{Float64}:
 1.4078926858640064
 1.4474394687089862
 1.2115808713475444
 1.2058593230448573
 1.144583351332513
 1.148826610875833
 1.2266957747843135
 1.3299669337721514
 1.3361863582881437
 1.1002754212746195
 ⋮
 1.1533008480222793
 1.1869995074569266
 1.2148002763177803
 1.186895006733359
 1.5476802837961292
 1.2790798393496807
 2.3665513040522095
 1.1021995425749411
 2.827905395338248
```
Now that the catalog is complete, it is possible to calculate the b-value (see [How-to: b-value](@ref)).


## Uncertainty

The uncertainty affecting the magnitude of completeness can be estimated with [bootstrap](https://en.wikipedia.org/wiki/Bootstrapping_(statistics)). 
This can be achieved with [Bootstrap.jl](https://github.com/juliangehring/Bootstrap.jl). 

```julia-repl
julia> using Bootstrap

julia> Nboot = 1000   # number of bootstrap samples
1000

julia> res = bootstrap(x->maxcurv(x,ΔM), mags, BasicSampling(Nboot))
Bootstrap Sampling
  Estimates:
     Var │ Estimate  Bias        StdError
         │ Float64   Float64     Float64
    ─────┼─────────────────────────────────
       1 │  1.11202  0.00442277  0.0227948
  Sampling: BasicSampling
  Samples:  1000
  Data:     Vector{Float64}: { 32461 }

julia> stderror(res)
1-element Vector{Float64}:
 0.02279475921271632
```

