Description: A paragraph-long elevator pitch of your project:
League of Legends is the most played video game in the world, with nearly 100 million worldwide players. When you queue for ranked, you always get matched with people you aren't thrilled with. Why not put the odds in your favor? Summoner seeker is designed to help you find someone of equal rank to harmoniously enter duoq with. Having a realiabe duoq partner is the key to success in climing the ranks of league of legends, and summoner seeker is designed to help you achieve this seamlessly. 



Another Link to project hosted on Heroku

https://ancient-plateau-9149.herokuapp.com/


Wireframes

http://imgur.com/a/q1UYa


User Stories, Site Flow, or equivalent
Sign up page --> fill in your preferences --> create account --> reroute to your profile --> user can view all summoners --> user can view other summoners profiles --> user can send message to other user --> user can view his/her own messages

http://i.imgur.com/fFnDcPe.jpg


An Entity Relationship Diagram
        --  message
user -- --  message
        --  message

1 to many, 1 user has many messages. 


APIs used
full api reference for riot games:
https://developer.riotgames.com/api/methods

Libraries used
jQuery, bootstrap


Wishlist / Future Development
Instant messaging, api calls that aren't limited, displaying ranked game history on each summoners profile page, uploading user images, using nicknames instad of actual summoner names (privacy protection), editable input fields, matching algorithem based on preferences and rank, filtering on the view summoners page to allow users to view only selected roles/ranks. 