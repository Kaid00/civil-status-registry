
# ABSTRACT

Some of the key roles of the local government are the maintenance of civil registries and the issuance of birth and marriage certificates. A problem faced is that carrying out these roles manually, leads to poor tracking and maintenance of these important documents, therefore automation of this process can lead to better maintenance of civil registries and better tracking of these important documents.

	This project aims to automate the process of maintaining and tracking civil status registries and the issuance of birth and marriage Certificates.

	For this project, a sample scenario of the Molyko Municipal council is considered

A web-based application is implemented offering an interface for the civil status registrar to select either birth or marriage certificate options and in each case, the capability of collecting and storing relevant data, both on a case by case basis, and in bulk by uploading data from a CSV file with the capability to generate and print PDFs of both certificates


# INTRODUCTION


## PROJECT AIM

The civil status registry project aims at automating the process of maintaining and tracking civil status registries and the issuance of birth and marriage certificates by developing a web-based civil status application, which offers a civil status registrar functionality to select either birth or marriage certificate options and in each case, the capability of collecting and storing relevant data,  both on a case by case basis, and in bulk by uploading data from a CSV file with the capability to generate and print PDFs of both certificates


## BACKGROUND INFORMATION

The roles of civil registries in Cameroon are maintaining and issuance of birth and marriage certificates to citizens. The birth certificate is required for identification, Education, Inheritance, voting. While marriage certificates are used to prove that two individuals are legally married and it is required for; Inheritance, registration of children.

These certificates are processed manually on paper; All vital information and events are directly recorded on standardized forms, their fields are manually filled in cursive writing, which prohibits their subsequent exploitation by optical character recognition[1]. This paper-based approach is very difficult to maintain and it is time-consuming as it may take a week to process and issue a birth certificate. Detailed information on the procedure of obtaining these certificates can be found in [2]


## PROJECT  BOUNDARIES

There is currently no official exposed method for automated verification of the authenticity of an ID card number, so for this project, ID card numbers collected as relevant data for either birth or marriage certificates are assumed to have been pre-authenticated


## REPORT  STRUCTURE

	The rest of the report is given as follows. Chapter 1 talks about the Analysis and Implementation stage of the research, how it was carried out, its functional and non-functional dependencies. Chapter 2 Shows code fragments on how key features were implemented. Chapter 3 shows the results gotten from the implementation stage. Chapter 4 talks about what happened and why it happened, possible sources of errors with the application. Chapter 5 sums up the project and its implications and suggestions for future research. Chapter 6 includes all the evidence that was cited in the main body of the report using the citation and referencing style. Chapter 7 shows details for setting up the application locally and the API documentation for the civil status registry application

 

CHAPTER 1


# ANALYSIS AND IMPLEMENTATION


## PROBLEM STATEMENT

The current process implemented by the local government to manually maintain civil registries and issue birth and marriage certificates brings along a couple of issues and flaws, keeping track of and maintaining these important documents is very difficult as registries are paper-based.

With registries being physically stored in the respective municipal council in which they were registered, this prohibits access to the documents associated with these registries by other municipal councils across the region as they can only be got from the municipal council from which they were initially registered, This brings along inconsistencies with the data in cases where a citizen has multiple documents registered at different municipal councils  


## RESEARCH QUESTIONS

Before and while carrying out this research, certain questions were raised such as;



1. What are the requirements for birth and marriage certificates?
2. Who has the authorization to create civil registries?
3. How is access to the database and application granted to the civil status registrar?
4. Who has the authorization to create civil registries?
5. Who authorizes and creates accounts for civil registrars within the application?
6. How are documents printed in bulk in cases where the registries were entered in bulk in the form of a CSV file?
7. Should the database maintain a PDF copy of each birth or marriage certificate or generate one from the database on each request?
8. How are the relevant data required for both birth and marriage certificates validated and authenticated?
9. How is the application going to be protected from attacks and illegal access by non-authorized persons?
10. Which database paradigm to use for storing and maintaining the registries?

The paper tries to answer these questions and shed more light on areas for further work and exploration


## RESEARCH METHOD

The case study for this research is the Molyko municipal council. The process of manually maintaining and tracking civil status registries and the issuance of birth and marriage certificates within the Molyko Municipal council was analyzed. 

	Detailed information on how the research was carried out to get the  requirements for birth and marriage certificates are found in [1]

In gaining the requirements for birth and marriage certificates, I also used an article on civil registration and vital statistics in Cameroon [1] I found on the Unicef website which had detailed information on how the process of maintaining civil status documents is performed in Cameroon, as well as the organization structure and all legal authorities in charge for maintaining births and marriage certificates along with all relevant requirements and data needed for registering birth and marriage certificates.

The answers and guides got from the research were used as a template to develop the database schemas for each registry and design the system 

With the chosen case study, the main users and business stakeholders are civil status registrars. The management or organizational stakeholder is the Ministry of Territorial Administration and Decentralization (MINATD)


## FUNCTIONAL AND NON-FUNCTIONAL REQUIREMENTS

The requirements are specified for the user take holder ( The civil status registrar) and the management stakeholder ( the system admin )


### Functional Requirements



1. The Civil Status Registrar
    1. Login into the application 
    2. Select either birth or marriage options
    3. For each selected case, collect data on a case by case basis
    4. For each selected case, collect data in bulk by using CSV files 
    5. Store and maintain registries for both civil status documents
    6. For each selected case, generate certificates in the format of printable PDF documents
    7. Retrieve accounts in case of forgotten password
2. The System Admin
    8. Manage user accounts
        1. Create, delete user accounts
    9. Unrestricted access to the entire database


### Non - Functional Requirements

These requirements are seen as attributes to the functional requirements. Functional requirements are implemented with them in mind and someplace more emphasis on one or more of them than others.



1. The application should be user-friendly, users should be able to become familiar with and competent in using the application. This can be measured by the training time needed before novice users get acquainted with using the application
2. The system has to be reliable due to the importance of the data and the damages that can be caused by incomplete or incorrect data, hence it has to produced accurate and desired results at all times.
3. The platform should be available and operational to all users at all working hours 


## ANALYZING  REQUIREMENTS


<table>
  <tr>
   <td>Requirement 
   </td>
   <td><strong>1.1: </strong>Login into the application
   </td>
  </tr>
  <tr>
   <td>Pre-condition
   </td>
   <td>Be a Civil status registrar appointed by the local government
   </td>
  </tr>
  <tr>
   <td>Operation
   </td>
   <td>Enter the following information in the login form on the login page
<ul>

<li>Email

<li>Password
</li>
</ul>
   </td>
  </tr>
</table>



<table>
  <tr>
   <td>Requirement 
   </td>
   <td><strong>1.2: </strong>Select either birth or marriage options
   </td>
  </tr>
  <tr>
   <td>Pre-condition
   </td>
   <td>
<ul>

<li>Be logged in as a User

<li>Be on the dashboard interface of the application
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Operation
   </td>
   <td>
<ul>

<li>Select either birth or marriage certificates from the dashboard navigation
</li>
</ul>
   </td>
  </tr>
</table>



<table>
  <tr>
   <td>Requirement 
   </td>
   <td><strong>1.3: </strong>Collect data on a case by case basis
   </td>
  </tr>
  <tr>
   <td>Pre-condition
   </td>
   <td>
<ul>

<li>Selected either birth or marriage options from the dashboard
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Operation
   </td>
   <td>
<ul>

<li>Fill in all form data for the corresponding selected option
</li>
</ul>
   </td>
  </tr>
</table>



<table>
  <tr>
   <td>Requirement
   </td>
   <td><strong>1.4: </strong>Collect data in bulk by using CSV files
   </td>
  </tr>
  <tr>
   <td>Pre-condition
   </td>
   <td>
<ul>

<li>Selected either birth or marriage options for upload from the dashboard
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Operation
   </td>
   <td>
<ul>

<li>Select the CSV file from local storage for the corresponding selected option
</li>
</ul>
   </td>
  </tr>
</table>



<table>
  <tr>
   <td>Requirement
   </td>
   <td><strong>1.5: </strong>Store and maintain registries for both civil status documents
   </td>
  </tr>
  <tr>
   <td>Pre-condition
   </td>
   <td>
<ul>

<li>Selected either birth or marriage options for upload from the dashboard
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Operation
   </td>
   <td>
<ul>

<li>Select the CSV file from local storage for the corresponding selected option
</li>
</ul>
   </td>
  </tr>
</table>



<table>
  <tr>
   <td>Requirement
   </td>
   <td><strong>1.6: </strong>Generate certificates in the format of printable PDF documents
   </td>
  </tr>
  <tr>
   <td>Pre-condition
   </td>
   <td>
<ul>

<li>Successfully collected and registered either birth or marriage certificate 
If the certificate is to be generated from an existing registered document from the database 
<ul>

<li>Document ID should match a document in the database for the corresponding selected document option (birth or marriage certificate )
</li>
</ul>
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Operation
   </td>
   <td>
<ul>

<li>Select the CSV file from local storage for the corresponding selected option
</li>
</ul>
   </td>
  </tr>
</table>



<table>
  <tr>
   <td>Requirement
   </td>
   <td><strong>1.7: </strong>Retrieve accounts in case of forgotten password
   </td>
  </tr>
  <tr>
   <td>Pre-condition
   </td>
   <td>
<ul>

<li>Should be a pre-existing user of the application
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Operation
   </td>
   <td>
<ul>

<li>Fill out accurately  the ‘forgotten password’ form on the forgotten password page

<li>An email will be sent to the user accounts,

<li>Follow the link received in the email to create a new password

<li>Fill out the ‘Create new password’ form 
</li>
</ul>
   </td>
  </tr>
</table>



<table>
  <tr>
   <td>Requirement
   </td>
   <td><strong>2.1: </strong>Manage user accounts
   </td>
  </tr>
  <tr>
   <td>Pre-condition
   </td>
   <td>
<ul>

<li>Should be a system admin
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Operation
   </td>
   <td>
<ul>

<li>Select which operation to perform on the user’s account

<li>For deleting accounts, select the specific user account to delete 

<li>For creating user accounts, fill in the ‘create user form’
</li>
</ul>
   </td>
  </tr>
</table>



<table>
  <tr>
   <td>Requirement
   </td>
   <td><strong>2.1: </strong>Unrestricted access to the entire database
   </td>
  </tr>
  <tr>
   <td>Pre-condition
   </td>
   <td>
<ul>

<li>Should be a system admin
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Operation
   </td>
   <td>The JSON web token attributed to system admins have unrestricted access to all exposed API endpoints
   </td>
  </tr>
</table>



## DESIGN OF THE CIVIL STATUS REGISTRY APPLICATION

The design is structured into 3 parts;


### Database Design 

For this application, a cloud-based MongoDB[3] database was developed to store and maintain the data for each civil status document and store data for each user of the application. The schema and design of the data models were based on the already available requirements for each civil status document and also required information on each user of the application


#### Birth certificate schema:


<table>
  <tr>
   <td><strong>Field</strong>
   </td>
   <td><strong>Data type</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>givenname
   </td>
   <td>string
   </td>
   <td>Child’s given name
   </td>
  </tr>
  <tr>
   <td>surname
   </td>
   <td>string
   </td>
   <td>Child’s surname
   </td>
  </tr>
  <tr>
   <td>born_on
   </td>
   <td>date
   </td>
   <td>Date of birth of the child
   </td>
  </tr>
  <tr>
   <td>born_at
   </td>
   <td>string
   </td>
   <td>Child’s place of birth 
   </td>
  </tr>
  <tr>
   <td>sex
   </td>
   <td>enum
   </td>
   <td>Child’s sex, either male or female
   </td>
  </tr>
  <tr>
   <td>father_name
   </td>
   <td>string
   </td>
   <td>Fathers name
   </td>
  </tr>
  <tr>
   <td>father_born_at
   </td>
   <td>string
   </td>
   <td>Fathers place of birth
   </td>
  </tr>
  <tr>
   <td>father_born_on
   </td>
   <td>date
   </td>
   <td>Fathers date of birth
   </td>
  </tr>
  <tr>
   <td>father_resident_at
   </td>
   <td>string
   </td>
   <td>Where father currently lives
   </td>
  </tr>
  <tr>
   <td>father_occupation
   </td>
   <td>string
   </td>
   <td>Fathers current occupation
   </td>
  </tr>
  <tr>
   <td>father_ref_doc
   </td>
   <td>number
   </td>
   <td>Fathers ID card number
   </td>
  </tr>
  <tr>
   <td>mother_name
   </td>
   <td>string
   </td>
   <td>Mothers name
   </td>
  </tr>
  <tr>
   <td>mother_born_at
   </td>
   <td>string
   </td>
   <td>Mothers place of birth
   </td>
  </tr>
  <tr>
   <td>mother_born_on
   </td>
   <td>date
   </td>
   <td>Fathers date of birth
   </td>
  </tr>
  <tr>
   <td>mother_resident_at
   </td>
   <td>string
   </td>
   <td>Where mother currently lives
   </td>
  </tr>
  <tr>
   <td>mother_occupation
   </td>
   <td>string
   </td>
   <td>Mothers current occupation
   </td>
  </tr>
  <tr>
   <td>mother_ref_doc
   </td>
   <td>number
   </td>
   <td>Mothers ID card number
   </td>
  </tr>
  <tr>
   <td>drawn_up_on
   </td>
   <td>date
   </td>
   <td>Date when the certificate was made 
   </td>
  </tr>
</table>



#### Marriage certificate schema:


<table>
  <tr>
   <td><strong>Field</strong>
   </td>
   <td><strong>Data type</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>bride_given_name
   </td>
   <td>string
   </td>
   <td>The given name of the bride
   </td>
  </tr>
  <tr>
   <td>bride_surname
   </td>
   <td>string
   </td>
   <td>The surname of the bride
   </td>
  </tr>
  <tr>
   <td>bride_id_num
   </td>
   <td>number
   </td>
   <td>The ID card number of the bride
   </td>
  </tr>
  <tr>
   <td>bride_place_birth
   </td>
   <td>string
   </td>
   <td>The place of birth of the bride
   </td>
  </tr>
  <tr>
   <td>bride_born_on
   </td>
   <td>date
   </td>
   <td>The date of birth of the bride
   </td>
  </tr>
  <tr>
   <td>bride_father_name
   </td>
   <td>string
   </td>
   <td>The bride’s fathers name
   </td>
  </tr>
  <tr>
   <td>bride_mothers_name
   </td>
   <td>string
   </td>
   <td>The bride’s mothers name
   </td>
  </tr>
  <tr>
   <td>bride_family_head
   </td>
   <td>string
   </td>
   <td>The head of the brides family
   </td>
  </tr>
  <tr>
   <td>bride_witness_name
   </td>
   <td>string
   </td>
   <td>Name of the bride’s witness
   </td>
  </tr>
  <tr>
   <td>bride_profession
   </td>
   <td>string
   </td>
   <td>The bride’s current profession
   </td>
  </tr>
  <tr>
   <td>bride_nationality
   </td>
   <td>string
   </td>
   <td>The bride’s nationality
   </td>
  </tr>
  <tr>
   <td>bride_resident_at
   </td>
   <td>string
   </td>
   <td>The bride’s current resident
   </td>
  </tr>
  <tr>
   <td>groom_given_name
   </td>
   <td>string
   </td>
   <td>The given name of the groom
   </td>
  </tr>
  <tr>
   <td>groom_surname
   </td>
   <td>string
   </td>
   <td>The surname of the groom
   </td>
  </tr>
  <tr>
   <td>groom_id_num
   </td>
   <td>number
   </td>
   <td>The ID card number of the groom
   </td>
  </tr>
  <tr>
   <td>groom_place_birth
   </td>
   <td>string
   </td>
   <td>The place of birth of the groom
   </td>
  </tr>
  <tr>
   <td>groom_born_on
   </td>
   <td>date
   </td>
   <td>The date of birth of the groom
   </td>
  </tr>
  <tr>
   <td>groom_father_name
   </td>
   <td>string
   </td>
   <td>The groom’s fathers name
   </td>
  </tr>
  <tr>
   <td>groom_mothers_name
   </td>
   <td>string
   </td>
   <td>The groom’s mothers name
   </td>
  </tr>
  <tr>
   <td>groom_family_head
   </td>
   <td>string
   </td>
   <td>The head of the grooms family
   </td>
  </tr>
  <tr>
   <td>groom_witness_name
   </td>
   <td>string
   </td>
   <td>Name of the groom’s witness
   </td>
  </tr>
  <tr>
   <td>groom_profession
   </td>
   <td>string
   </td>
   <td>The groom’s current profession
   </td>
  </tr>
  <tr>
   <td>groom_nationality
   </td>
   <td>string
   </td>
   <td>The groom’s nationality
   </td>
  </tr>
  <tr>
   <td>groom_resident_at
   </td>
   <td>string
   </td>
   <td>The groom’s current resident
   </td>
  </tr>
  <tr>
   <td>marriage_type
   </td>
   <td>enum
   </td>
   <td>Marriage type Polygamy or Monogamy
   </td>
  </tr>
  <tr>
   <td>objections
   </td>
   <td>enum
   </td>
   <td>Records if objections were made on the marriage, value is either Yes or No
   </td>
  </tr>
  <tr>
   <td>matrimonial_regime
   </td>
   <td>enum
   </td>
   <td>Records how property is handled, value either Joint or Separate
   </td>
  </tr>
</table>



#### User schema:


<table>
  <tr>
   <td><strong>Field</strong>
   </td>
   <td><strong>Data type</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>name
   </td>
   <td>string
   </td>
   <td>The uses name
   </td>
  </tr>
  <tr>
   <td>role
   </td>
   <td>enum
   </td>
   <td>Users role, value either registrar or admin
   </td>
  </tr>
  <tr>
   <td>email
   </td>
   <td>email
   </td>
   <td>The users’ email address
   </td>
  </tr>
  <tr>
   <td>password
   </td>
   <td>password
   </td>
   <td>Password to the users’ account
   </td>
  </tr>
  <tr>
   <td>passwordChangedAt
   </td>
   <td>date
   </td>
   <td>Keeps track of when last the users password changed
   </td>
  </tr>
  <tr>
   <td>passwordResetToken
   </td>
   <td>string
   </td>
   <td>An optional field containing a reset token [4] which lets users reset forgotten passwords
   </td>
  </tr>
</table>



### API Design 

A REST API [5] was developed using ExpressJs [6] and NodeJs following the REST architectural style [5], allowing for interaction with the MongoDB database. The design pattern was based on the  Model-view-controller architecture [7]. The API documentation is found below in the appendix.





	



## Setup
- Clone this repository
- Download and install Node js
    - Windows 
        - (64-bit installer)[https://nodejs.org/dist/v14.17.3/node-v14.17.3-x64.msi]
        - (32-bit installer)[https://nodejs.org/dist/v14.17.3/node-v14.17.3-x86.msi]
    - Mac OS
        - (Installer)[https://nodejs.org/dist/v14.17.3/node-v14.17.3.pkg]
    - Linux
        - (Installer)[https://nodejs.org/dist/v14.17.3/node-v14.17.3-linux-x64.tar.xz]
- Open a terminal window
    - Windows ** Ctrl + Shift + T **
    - Mac OS ** Control + Option + Shift + T **
    - Ubuntu ** Ctrl + Alt + T **
- In your terminal window navigate to the cloned repository folder
- In the folder run the command * npm install * to install the projects dependencies 
- When the project dependencies have been installed run the comman * npm start * to initialize the database and the server 
- In your browser run the URL * localhost:3000/ * this URL points to the applications home page, from where you can proceed to login into the application
