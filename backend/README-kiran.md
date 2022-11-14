# How to run

- Clone the repo

  git clone https://github.com/KiranGopalakrishnan/vaso-hq-backend-challenge.git

- This project uses yarn . Make sure you have yarn installed, if not install yarn
- Go into `/backend` folder
    - run

  yarn install

This will bootstrap the dependencies in the workspace including package -> package deps

- then run

    yarn run test

for testing

for development, go into one of the level folders, then run

    yarn run dev 

but make sure to do a yarn install before , and also run dev inside the `shared` folder

# Architecture

I am following a DDD oriented architecture, and borrowing principles from CLEAN architecture & SOLID design patterns,
The main concepts are as follows

### Object oriented

- The principles that i wanted to follow were suited better to a Object oriented structure.

### Dependency Injected

- I am using `tsyringe` for dependency injection across the project
- Inversion of control allows the units of the architecture to be tested in isolation while making it easier for me to
  mock/provide dependencies
- BAD: I am depending on concretions for dependency injection , and i am aware that this is not neccessorily a good
  design pattern , but i had trouble getting tsyringe to use interface defenition for DI , did not spend much time on
  figuring it out.

### Citizens of the architecture

- Entities
    - Entities are basically your domain objects , contains the core enterprise rules of your business.
    - Is an encapsulation of your business rules and actions that can be performed on them
    - Is independent on how the data is presented / stored in the infrastructure/db layer
    - Does not allow the system to violate a domain's bounderies
- Aggregates
    - Aggregates are composed of entities and/or other aggregates that can be thought of as a single item.
    - Enables actions to be performed on domain objects and relevent data is exposed.
- Controller
    - Outer most layer of the architecture
    - handles transforming domain data to view specs.
    - handles many validation logic for input data

- Service
    - Traditionally a service layer handles business logic. But since the business rules are encapsulated in entities
      and aggregates, service layer in this architecture handles performing neccessory aggregate creations and handling
      multiple aggregates or entities as needed , and also handles any errors that occur in the domains and throw
      appropriate application error.
    - The service layer on this application might seem like unneccessory boilerplate as it's not really doing much , but
      IMO provides much needed seperation between view / presentation layer and core business rules.- Repository
- Repository
    - Interfaces with the data source.
    - provides some much needed seperation between the domain and the data storage/infrastructure
- Formulas
    - Not a traditional architecture concept
    - Contains formulas or calculations that are core to the business
    - Allows Separation between data manipulation and mathematical formulas used in the application
    - I like to use them because it is easier to reason about than looking through data manipulation code to understand
      what the actual calculations and their variables are.
    - Should ONLY be used by the entities or aggregates

- DTO
    - Part of the view /presentation layer
    - Represents the data being sent to outside world from thew system
    - contains formatting logic for data
    - transforms and exposes appropriate data from domain
- Tranformers
    - Only used in the controller in this architecture(There might be an argument for having one between repo and DB
      layer when entities needs to be saved to a DB)
    - Seperates view from the domain
    - Maps relevent fields from domains to the DTO
    - Allows domain layer and view layer to evolve at different speeds
    - protects consumers of the API from any core domain changes (Like renaming of a field)

### Other details

- I have chosen to create a new package in the workspace called shared, which
    - can be used by each level package
    - does not depend on trpc/express, anmd hence can be consumed by anything
    - exposes only relevent entities from the package.

### Things to note

- I disabled noUnsedLocals in tsconfig , as i am declaring properties in classes , and if i have a method called in
  constructor that sets the property ts cannot detect that and complains , which IMO is a limitation of this setting.
- You will notice in certain places i am explicitly telling the ts compiler that there will be a value assigned to the
  property (using a `!`) it avoids more or less the same problem as the previous one.