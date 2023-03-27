# MSCI-342-Team-Project
Yashvi, Vedangi, Bhairavi, Anna

README File for BARK

PROJECT DESCRIPTION:
	
	According to Stat Canada, in 2014 only 38% of women felt safe walking alone in their neighbourhood after dark, compared to 64% of men. For many, walking home after nightfall can be a scary experience. Drawing from our own experiences, we are planning to create a system to help users feel safer and more protected when walking alone at night. We aim to empower people to navigate the city of Waterloo with confidence by knowing that the routes they are taking to get to their destination are the safest ones available.

INSTALLATION INSTRUCTIONS:

	SPECIAL NOTE: In order to properly work, the map requires an API key within the /Map file. We cannot keep the key on GitHub, and it must be linked and configured to a specific google account, so we will be sending the key in a seperate corespondence. The key should be set as the value of "apiKey" on line 29 of /Map/index.js. If this is not entered the map will appear in dev mode.

	To install, clone the app from github, navigate to the project directory, install the needed dependecies, and then run the app in devlopment mode using "yarn dev" to see the project in the browser. On the home page there is a package called react twitter embed that can be installed with npm i react-twitter-embed. 

TESTING INSTRUCTIONS:

	We have developed tests in jest and cypress that are able to be viewed within the different component folders.

DEPENDENCIES: 

We used the regular dependencies that were in the base node-react-app as well as the following additional libraries: 

	"@mui/icons-material": "^5.11.9" - for the user interface
      "@mui/material": "^5.11.10" - for the user interface
	"@react-google-maps/api": "^2.18.1" - for the google map (this is a library)

To see all additional dependecies please see the package.json file located in the root directory as well as under /client.

