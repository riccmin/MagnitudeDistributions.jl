"""
	histmag(mags, binwidth)

Group the magnitude values `mags` into magnitude bins of width `binwidth`. 
Return an array containing the center of each bin and an array containing the 
number of events in each bin. The left edge of the first bin corresponds to the minimum magnitude
in `mags`.
"""
function histmag(mags::AbstractVector{T}, binwidth::S) where {T,S<:Real}

    binedges = minimum(mags):binwidth:maximum(mags)+binwidth
    bincenters = collect(binedges[1]+binwidth/2:binwidth:binedges[end])

    h = fit(Histogram,mags,binedges)
    binevents = h.weights

    return bincenters ,binevents 

end