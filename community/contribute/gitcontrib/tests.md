## Writing tests

1. Go visit https://codecov.io/gh/riccmin/MagnitudeDistributions.jl.

2. Browse through the source files and find some untested functionality (highlighted in red). 
   Even if a method already has some coverage on Codecov, it may still benefit from tests for edge cases.

3. Write a test that exercises this functionality---you can add your test to one of the existing files, or start a new one. If you're adding a new test file, make sure you include it in the list of tests in `test/runtests.jl`. https://docs.julialang.org/en/v1/stdlib/Test/ may be helpful in explaining how the testing infrastructure works.

4. Run `julia --project=@. test/runtests.jl` from the root directory of the package to run your new test(s).

5. Submit the test as a pull request.