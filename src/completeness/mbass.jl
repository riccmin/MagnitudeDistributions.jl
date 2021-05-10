# adjust sl by subtracting median (prevents old change points to affect the estimation of new change points)
function _adjustslope!(sl::AbstractVector{<:AbstractFloat}, indmax::Int, N::Int)
    
    med1 = median(sl[1:indmax])
    for i in 1:indmax   
        sl[i] -= med1
    end

    med2 = median(sl[indmax+1:end]) 
    for i in indmax+1:N 
        sl[i] -= med2
    end
end


# adjust sum of the ranks by the amount expected on average
function _adjustsumrank!(SA::AbstractVector{<:AbstractFloat}, sl::AbstractVector{<:AbstractFloat}, N::Int)
    for i in 1:N
        SA[i] = abs(2*sum(tiedrank(sl)[1:i]) - i * (N + 1))
    end
end



function _findchange(sl::AbstractVector{<:AbstractFloat})

    niter = 3
    N = length(sl)
    SA  = Array{Float64}(undef, N)
    pva = Array{Union{Missing,Float64}}(missing, niter)  # stores p values
    τ = Array{Union{Missing,Int}}(missing, niter)    # stores ind

    if N >= 10
        for j in 1:niter

            _adjustsumrank!(SA, sl, N)

            indmax = argmax(SA)
            xn1 = sl[1:indmax]
            xn2 = sl[indmax+1:end]

            p = pvalue(MannWhitneyUTest(xn1, xn2))

            # at least 10 point both ends. Reccomended by Lanzante 1996
            if ( (5 <= indmax <= N-5) && (p < 0.05) )

                pva[j] = p
                τ[j] = indmax

                _adjustslope!(sl, indmax, N)
            end
        end
    end

    return pva, τ
end



"""
    mbass(mags, ΔM)

Apply the Median-Based Analysis of the Segment Slope method to estimate the 
magnitude of completeness.

# Arguments
* `mags`: array storing the magnitude values of an incomplete catalog.
* `ΔM`: bin width to be used to group the magnitude values.`

 # References
* Amorese 2007. Applying a Change-Point Detection Method on Frequency-Magnitude
  Distributions. Bulletin of the Seismological Society of America 97 (5): 1742–1749.
  https://doi.org/10.1785/0120060181
* Lanzante 1996. Resistant, Robust and Non‐Parametric Techniques for the Analysis 
  of Climate Data: Theory and Examples, Including Applications to Historical 
  Radiosonde Station Data. Int. J. Climatol., 16: 1197-1226. https://doi.org/10.1002/(SICI)1097-0088(199611)16:11<1197::AID-JOC89>3.0.CO;2-L
"""
function mbass(mags::AbstractVector{T}, ΔM::S) where {T,S<:Real}

    bincenters, binevents = histmag(mags, ΔM)

    Mc = mbass(bincenters, binevents)

    return Mc
end



"""
    mbass(bincenters, binevents)

Apply the Median-Based Analysis of the Segment Slope method to estimate the 
magnitude of completeness.

# Arguments
* `bincenters`: array storing the central values of the magnitude bins.
* `binevents`: array storing the number of events in the magnitude bins.

`bincenters` and `binevents` can be obtained with  [`histmag(mag, ΔM)`](@ref).
"""
function mbass(bincenters::AbstractVector{T}, binevents::AbstractVector{S}) where {T,S<:Real}

    if length(bincenters) != length(binevents)
        error("The two input arrays must have the same number of elements")
    end

    # remove zero values to avoid Inf after log10
    goodind = binevents .!= 0
    x = bincenters[goodind]
    y = binevents[goodind]

    # Estimate slope/first derivative for each point (Segment slope)
    sl = diff(log10.(y)) ./ diff(x)
    x2 = x[2:end] #(x[2:end] .+ x[1:end-1]) ./ 2.

    pva, τ = _findchange(sl)

    if all(q->ismissing(q),pva)
        #@warn "Unable to identify change point. Number of points is probably not large enough. Try to add more events or change ΔM"
        return NaN
    else
        argpmin = argmin(skipmissing(pva))
        mainBreak = x2[ τ[argpmin] ]     

        return mainBreak 
    end
end


