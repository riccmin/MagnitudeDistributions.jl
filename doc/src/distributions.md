# Frequency-Magnitude Distributions

## Distributions
```@docs
GRclassic
```

## Distribution fitting
```@docs
fit_mle(::Type{<:GRclassic}, mags::AbstractArray{<:AbstractFloat}, M0::Real) 
fit_binned(::Type{<:GRclassic}, mags::AbstractArray{<:AbstractFloat}, M0::Real, ΔM::Real) 

fit_stderr
fit_stderrbinned
```

## Sampling
```@docs
rand(::AbstractRNG, ::UnivariateDistribution)
```


## Parameter Retrieval
```@docs
params(::UnivariateDistribution)
scale(::UnivariateDistribution)
location(::UnivariateDistribution)
rate(::UnivariateDistribution)
bvalue(::UnivariateDistribution)
```

## Probability Evaluation
```@docs
pdf(::UnivariateDistribution, ::Real)
logpdf(::UnivariateDistribution, ::Real)
cdf(::UnivariateDistribution, ::Real)
logcdf(::UnivariateDistribution, ::Real)
ccdf(::UnivariateDistribution, ::Real)
logccdf(::UnivariateDistribution, ::Real)

```

## Misc

```@docs
avalue(::UnivariateDistribution, N::Real, ΔM::Real)
```