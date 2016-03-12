Angular Transactional Form Sample
=========
This is a transactional form written in Angular.  The form consists of dropdown selectors for center (store), representative, and status; a textarea for notes; and a datepicker for Expiration Date.  It is programmed with services for reading and writing data to and from storage.

This code demonstrates:

* HMTL Templating
* Controllers
* Services
* Directives
* Routing (using [angular-ui-router](https://github.com/angular-ui/ui-router))
* Internationalization
* Service Mocking with [API Blueprint](https://apiblueprint.org/)
* [LESS](http://lesscss.org/) files for CSS

The code depends on certain libraries and project configuration that has not been included in this repository.

All files are in the subdirectory /src/estimates/main unless otherwise specified.

##Angular Files Summary
------------------------

###/routes/estimates/estimates-route.js
Defines the URI /:estimatesId/main (for example, /34523/main) for reaching the template estimates.html.  The template is associated with the Estimates Controller.

###estimates.html
The parent template.  Includes header information and a call to the Estimates Directive.

###estimates-ctrl.js
The Estimates Controller, which retrieves service data, and places it in scope for view by the template.

###estimates-directive.js
The Estimates Directive, is where the form is created.  Data from the Estimates Controller in estimates.html is passed as parameters to the directive.

###estimates-directive.html
The template for the Estimates Directive

###estimates.less
CSS styling for the templates, in LESS syntax.

###estimates-directive-ctrl.js
The Estimates Directive has its own controller.  This functionality could also have gone directly into the directive with a link() function, but separating it makes it available for testing.

###estimates-svc.js
The Estimates Service handles the $http transactions with REST services.

###estimates-logic-svc.js
Contains helpers and miscellaneous business logic for the page.

##Resources
-----
###/resources/api-blueprint/md/estimate-api.md
A markdown file defining a mock GET endpoint service with the path:
`
	/estimates/users/:userId/estimates/:estimatesId  
`

###/resources/api-blueprint/json/estimates/topLevel.json
The JSON response to return when the mock endpoint is called.

###/resources/i18n/estimates/en.json
The labels for fields, headers and messages in English.  A placeholder file for future spanish translation is found in es.json.

###/resources/css/globals.less
Definition of LESS variables and macros.