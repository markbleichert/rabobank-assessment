# How the application works

The application can load and parse 2 types of data, xml.
There is a seperate tab to view the parsed results of each type of input data.
There is also a third tab that will show the combined results of both files.

For all data, the work flow is as follows:
* load data as a string
* pass the string to a file type specific parser
* parse data to json

When data is parsed to json format, we can use a validator with a strict interface.
This means that all parsed data must comply to the same interface.
The validator will then store:
* all references that are not unique
* all end-balances that do not match the computation of start balance and mutation.

After validation, when the results are presented in the UI, for each record the
validator can be queried to determine if a record is valid. There are 3 types of
validation implemented:
* is a record reference unique
* is the end balance correct
* does the record contain invalid properties

## Features

Clicking a tab will load, parse and validate a data file. Data can then be sorted
by either reference or accountnumber.

Eventhough all data is instantly validated and all results are presented in the UI,
there also is a 'Live validation' feature implemented. In the the title bar of
the results list there is a button which will start and pause the live validation.

The live validator will go through the list of results and highlight each record as
it goes through the list. It will display gray when a record is valid and red when a
record contains invalid data.
