## Contributing with new functionalities

 1. Edit the appropriate file in the `src/` directory, or add new files if necessary. 

 2. Add any necessary export in `src/MagnitudeDistributions.jl`.

 3. Create tests for your functionality (see [tests.md](https://github.com/riccmin/MagnitudeDistributions.jl/blob/main/community/contribute/gitcontrib/tests.md))

 4. Commit your changes and open a pull request.


It is preferable not to add new dependencies. If you believe it is necessary, open a [discussion](https://github.com/riccmin/MagnitudeDistributions.jl/discussions).

### Code Formatting Guidelines

 - 4 spaces per indentation level, no tabs
 - use whitespace to make the code more readable
 - no whitespace at the end of a line (trailing whitespace)
 - comments are good, especially when they explain the algorithm
 - try to adhere to a 92 character line length limit
 - use upper camel case convention for modules, type names
 - use lower case with underscores for method names
 - it is generally preferred to use ASCII operators and identifiers over
   Unicode equivalents whenever possible
