### Improving documentation


The documentation source files are stored in the `doc/` directory and all docstrings are found in `src/`. Documentation is built with [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl), which uses Markdown syntax.


#### Modify the source text in `doc/src/`

1. update the text in whichever `.md` files are applicable;
2. run `julia --project=@. make.jl` from the `doc/` directory;
3. check the output in `doc/build/` to make sure the changes are correct;
4. commit your changes and open a pull request.

> **Note**
>
> The contents of `doc/build/` do **not** need to be committed when you make changes.

To add a **new file** to `doc/src/` rather than updating a file replace step `1` above with

1. add the file to the appropriate subdirectory in `doc/src/` and also add the file path to the `pages` vector in `doc/make.jl`.


#### Modifying an existing docstring in `src/`

1. find the method the docstring refers to;
2. update the text of its docstring;
2. run `julia --project=@. make.jl` from `doc/`;
4. check the output in `doc/build/` to make sure the changes are correct;
5. commit your changes and open a pull request.



#### Adding a new docstring to `src/`

1. add a docstring above a method;
2. find a suitable `@docs` code block in one of the `doc/src/` files where you would like the docstring to appear;
3. add the name of the definition to the `@docs` code block. For example, with a docstring added to a function `bar`

    ```julia
    "..."
    function bar(args...)
        # ...
    end
    ```

   you would add the name `bar` to a `@docs` block in `doc/src/MagnitudeDistributions.jl/`

        ```@docs
        foo
        bar # <-- Added this one.
        baz
        ```

5. run `julia --project=@. make.jl` from the root directory;
6. check the output in `doc/build/` to make sure the changes are correct;
7. commit your changes and open a pull request.
