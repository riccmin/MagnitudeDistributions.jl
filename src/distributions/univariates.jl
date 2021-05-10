"""
    bvalue(::UnivariateDistribution)
Get the b-value
"""
bvalue(::UnivariateDistribution)

"""
    avalue(::UnivariateDistribution, N::Real, ΔM::Real)
Get the a-value of a frequency-magnitude distribution composed of `N` events grouped into magnitude bins
of width `ΔM`. 
"""
avalue(::UnivariateDistribution, N::Real, ΔM::Real)