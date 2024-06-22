## Unit Assignment: Kudos Board

Submitted by: **Andrew Chu**

Deployed Application (optional): [Kudos Board Deployed Site](https://kudos-board1-mb25.onrender.com)

### Application Features

#### CORE FEATURES

- [X] **Home Page**
  - [X] Displays header, banner, search, board grid, and footer.
  - [X] Displays preview of all boards on initial page load.
    - [X] Boards previews should show an image/gif and board title.
  - [X] Users can click on a category (recent, celebration, thank you, inspiration) to filter the boards.
    - [X] Recent displays most recently created boards.
    - [X] Other categories display boards of that type.
  - [X] Users can search for a board by name.
  - [X] Users can click on a board to navigate to a new page containing that board.
  - [X] Users can create a new board.
    - [X] Boards should have a title, category, and author (optional).
  - [X] User can delete boards.
  
- [X] **Board Page**
  - [X] Displays a list of all cards for a board.
    -  [X] Each card features a text message.
    -  [X] Each card features a gif found using the [GIPHY API](https://developers.giphy.com/docs/api/).
    -  [X] Users can optionally sign the card as the author.  
-   [X] Cards can be upvoted.
-   [X] Cards can be deleted.


#### STRETCH FEATURES


- [ ] **User Accounts** [feature removed by Codepath]
  - [ ] Users should be able to log in with a username and password.
  - [ ] Users should be able to sign up for a new account.
  - [ ]  Boards and cards should be associated with a user.
    - [ ]  Anonymous cards or cards by guest users should still be allowed.
  - [ ] Add a new filter option on the home page to display only the current user's boards.
  - [ ] Allow boards to be deleted only if they are owned by the user.
- [X] **Deployment**
  - [X] Website is deployed via Render.
- [X] **Comments**
  - [X] Users should be able to comment on cards.


### Walkthrough Video
![Walkthrough Video](https://github.com/Andrew-Chu-MetaU-Engineering/kudos-board/blob/55811e31a2339a4aabe35b42ffb4848f3c37bc3e/demo.gif)

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Add your response here
The topics discussed in the labs, particularly with regard to setting up a backend and middleware with Node.js and Express, prepared me to complete the assignment. I felt that I had a strong understanding of how to write functions for CRUD operations as a result of our in class lectures and labs. However, I felt less prepared to complete the routing aspects of this project, as I did not have a chance to get hands-on experience with routing before the project. So, I consulted both online documentation and one of my peers, German, who helped me set up the router, and also a Codepath instructor, Jackie, who helped me get a better conceptual understanding of how the routing worked.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time on this project, I would have liked to add the user authentication feature that was removed by Codepath for this assignment. The project feels a bit incomplete without users, as features like upvoting and commenting do not make a lot of sense on a kudos board without users. I would have liked to learn about and implement user authentication and tie in the features that I had implemented with the user auth.
On a code organization, if I had more time on this project, I would have liked to refactor my code to better make better use of repeating components (e.g. modals) as I ended up making each component too specialized, despite performing similar functions.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

Although no demos happened this week, over the course of this week, I noticed many interesting and varying implementations of the kudo board project. For instance, I noticed from my conversations with Theo that he decided to implement Comments and Likes models in his Prisma schema, so that they could be traced to users, with a many-to-many relationship in his database. I thought his decision to plan for user auth and implement that in his schema was interesting.

### Open-source libraries used

- [Material UI](https://mui.com/), used for styling

### Shout out

Shout out to my cohort's instructor Jackie for taking the time to explain React Router at a conceptual level--- it helped me gain a much deeper understanding of React's routing after I had a hard time trying to understand from the docs.
