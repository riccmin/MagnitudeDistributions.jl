"""
    maxcurv(mags, ΔM)

Apply the maximum curvature method to compute the magnitude of completeness.

# Arguments
* `mags`: array storing the magnitude values of an incomplete catalog.
* `ΔM`: bin width to be used to group the magnitude values.`
"""
function maxcurv(mags::AbstractVector{T},ΔM::S) where {T,S<:Real}

	bincenters, binevents = histmag(mags, ΔM)

	Mc = maxcurv(bincenters, binevents)

	return Mc
end


"""
    maxcurv(bincenters, binevents)

Apply the maximum curvature method to compute the magnitude of completeness.

# Arguments
* `bincenters`: array storing the central values of the magnitude bins.
* `binevents`: array storing the number of events in the magnitude bins.

`bincenters` and `binevents` can be obtained with  [`histmag(mag, ΔM)`](@ref).
"""
function maxcurv(bincenters::AbstractVector{T},binevents::AbstractVector{S}) where {T,S<:Real}

    if length(bincenters) != length(binevents)
        error("The two input arrays must have the same number of elements")
    end

    Mc::Float64 = bincenters[ argmax(binevents) ]

    return Mc
end
