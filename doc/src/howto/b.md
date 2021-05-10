# How-to: b-value

## Input magnitudes

The input magnitudes are obtained by randomly sampling an exponential distribution (see 
[`GRclassic(b, M0)`](@ref)). 

```julia-repl
julia> using MagnitudeDistributions, Random

julia> Random.seed!(10) # to make results reproducible

julia> b = 1.0    # b-value
1.0

julia> M0 = 0.5   # minimum magnitude
0.5

julia> N = 100000 # number of samples
100000

julia> mags = rand(GRclassic(b,M0), N)
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

## Estimation

The b-value can be computed with the method of Aki-Utsu (see [`fit_mle(D::Type{<:GRclassic}, mags, M0)`](@ref)): 

```julia-repl
julia> GRfit = fit_mle(GRclassic, mags, M0)
GRclassic{Float64, Float64}(b=1.0017187780348895, M0=0.5)
```

!!! note

    When dealing with binned magnitudes, the method of Tinti and Mulargia should be used instead 
    (see [`fit_binned(D::Type{<:GRclassic}, mags, M0, ΔM)`](@ref)).


## Uncertainty

The stadard error affecting the b-value can be estimated with [bootstrap](https://en.wikipedia.org/wiki/Bootstrapping_(statistics)). This can be 
achieved with [Bootstrap.jl](https://github.com/juliangehring/Bootstrap.jl). 

```julia-repl
julia> using Bootstrap

julia> Nboot = 1000  # number of bootstrap samples
1000

julia>  res = bootstrap(x-> fit_mle(GRclassic,x,M0).b, mags, BasicSampling(1000))
Bootstrap Sampling
  Estimates:
     Var │ Estimate  Bias        StdError
         │ Float64   Float64     Float64
    ─────┼──────────────────────────────────
       1 │  1.00172  6.47247e-5  0.00318899
  Sampling: BasicSampling
  Samples:  1000
  Data:     Vector{Float64}: { 100000 }

julia> stderror(res)
1-element Vector{Float64}:
 0.0031889945788686844

```

Alternatively, the uncertainty can also be determined directly with the method of
Shi and Bolt (see [`fit_stderr(D::Type{<:GRclassic}, mags)`](@ref)):

```julia-repl
julia> fit_stderr(GRfit, mags)
0.003165105319481647
```

