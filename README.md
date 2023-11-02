# Memories


<!-- ABOUT THE PROJECT -->
## About The Project (Executive Summary)

Imagine seeing a beautiful sunset when taking a solo walk along the beach. You want to take a photo but also want to make sure that you pinpoint the exact location. Fret no further, the Memories app is here for you! Memories is an app for making memories, with a platform for private and public note-taking. You can take photos and/or text notes and associate them with location on a map view, with the ability to make a “memory” (a bit of text/note, a photo, or video) private or public. Therefore, you can keep some memories for yourself. For example, you can note down class details or location-based hobbies such as photography, bird watching, etc.; post fun memories with friends, or personal restaurant ratings.


### Built With

The Memories application relies on the following:

| Frameworks                    | Technologies                      |
| ---:                          | :----                             |
| React.js                      | JavaScript                        |
|                               | CSS                               |
|                               | HTML5                             |


### Get Started (Back-End)

1. Navigate to backend directory
   ```sh
    cd memories_back_end
    ```
2. To start the node server
    ```sh
    node app.js
    ```
3. Navigate to http://localhost:3000/URI for testing

### Get Started (Front-End)

1. Navigate to backend directory
   ```sh
    cd mobile/memories
    ```
2. Start development server
    ```sh
    npx expo start
    ```
2. Open the Expo app ( [IOS](https://apps.apple.com/us/app/expo-go/id982107779) [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US) )
3. Scan QR Code on phone


### Prerequisites

To avoid issues with cloning and testing the repository, ensure the following technologies are up to date:
1. npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

_The following steps allow a new developer to install the main repository and begin testing locally._

1. Clone the repo
   ```sh
   git clone https://github.com/mercuryhg31/memories.git
   ```
2. Install NPM packages in the memories folder
   ```sh
   npm install
   ```


<h2> Project Description </h2> <br>
The main page of Memories is a map of the surrounding area close to them, with memories of businesses or people that they follow, people they are friends with, or groups or communities they were placed in. Accounts are private to start, but these accounts can be made public. Memories, or posts, can be made with or without tags: interests or descriptions of posts that are searchable throughout the app.  There are two ways that users can set up their account with Memories, having a personal account or a business account.
With personal accounts, users can add other personal account users as friends. Friends will be able to access each other's posts that have been marked as friends-only. If a personal account user chooses to make their account public, any user who follows them will be able to see their posts.
Users will also be able to group their friends, such as marking friends as “Family” or “Girls Soccer Team”. When creating groups with their friends, these posts will be visible to only the people within the group by default. Users can also make groups/communities, almost like a group chat, where they can invite users to post their memories in this community. Every member who accepts a community invite can now see posts made by other users in the group and can post memories as well. Users will be able to choose who can view posts: Private Posts that only the user can see, Friend Posts that only friends can see, or Group/Community Posts that only people within the group it is posted in can see.
The other type of account that users can make are business accounts. With business accounts, their posts will be shown to every user with tags that correlate to their business. Business accounts have no friends, and their posts are public. Users with personal accounts will have the option to select interests (tags) that resonate with them, such as tags associated with a particular business (e.g. food, groceries, etc). For example, suppose an art studio that only showcases scenery and animals posts a memory. Every user who searches their local map for that tag/interest such as art, nature, or animals will see the posts from this art studio.
