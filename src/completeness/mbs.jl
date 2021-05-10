"""
Calculate the moving average on an array of b-values
"""
function  _moving_average(arrb::AbstractVector{Float64}, nwin::Int) 

    bavrg = fill(NaN,length(arrb))

    for i in 1:(length(arrb) - (nwin - 1))
        bavrg[i] = mean( @view arrb[i:(i+nwin-1)] )
    end

    return bavrg
end


"""
    bMcstep(mag, bincenters, ΔM, minevents)

Calculate b-value for each possible cut-off magnitude

# Arguments
*  `mags`: array storing the magnitude values of an incomplete catalog.
* `bincenters`: array storing the central value of the magnitude bins.
* `ΔM`: bin width.
* `minevents`: minimum number of events allowed when calculating b-values.

# Return
* `Bvals`: 1D array with the b values calculated varying the cut-off magnitude
* `Stds`: 1D array with the uncertainties associated with the calculated b values
"""
function _bMcstep(mag::AbstractVector{T}, bincenters::AbstractVector{Float64}, ΔM::S, minevents::Int) where {T,S<:Real}

    N = length(bincenters)
    bvals = fill(NaN,N)
    stds  = fill(NaN,N)

    for i in 1:N
        Mc = bincenters[i]
        submag = @view mag[mag .>= Mc-ΔM/2]

        if length(submag) >= minevents
            fitgr = fit_mle(GRclassic, submag, Mc-ΔM/2)
            bvals[i] = bvalue(fitgr)
            stds[i] = fit_stderr(fitgr, submag)
        else
            break
        end
    end

    return bvals, stds
end



"""
    mbs(mags, ΔM; winsize=5, minevents=50)

Compute the magnitude of completeness with the b−value stability (MBS)
method.

# Arguments
* `mags`: array storing the magnitude values of an incomplete catalog.
* `ΔM`: bin width to be used to group the magnitude values.`

# Keyword arguments
* `winsize`: window length used for the moving average. Default is 5 magnitude bins
* `minevents`: minimum number of events allowed when calculating b-values. Defaul is
   50 events.

# References:
* Cao and Gao, 2002, Temporal variations of seismic b-values beneath northeastern 
  japan island arc, Geophysical Research Letters, 29, https://doi.org/10.1029/2001GL013775
* Woessner and Wiemer (2005), Assessing the quality of earthquake catalogues: 
  Estimating the magnitude of completeness and its uncertainty, Bulletin of the Seismological Society of America, 
  95, https://doi.org/10.1785/0120040007
"""
function mbs(mag::AbstractVector{T}, ΔM::S; winsize::Int=5, minevents::Int=50) where {T,S<:Real}

    bincenters = histmag(mag,ΔM)[1]

    # Calculate b-with magnitude
    bvals, stds = _bMcstep(mag, bincenters, ΔM, minevents)

    baverages = _moving_average(bvals,winsize)

    # If fBave is in in between the error estimate of the b-value of the first 
    # cut-off magnitude, take it as guess
    goodSteps = abs.(baverages .- bvals) .<= stds
    latest_good = findfirst(goodSteps)

    if !isnothing(latest_good)
        return bincenters[latest_good]
    else
        return NaN
    end

end