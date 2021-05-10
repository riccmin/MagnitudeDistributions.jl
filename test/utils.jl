@testset "Utils" begin
    mags = [0.0,0.049, 0.051, 0.10]
    ΔM = 0.1
    x, y = histmag(mags, ΔM)
    @test round.(x,digits=3) == [0.05,0.15]
    @test y == [3,1]
end