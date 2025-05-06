const star = document.querySelector(`div`);
const starStyle = window.getComputedStyle(star);    //Purely there to detect what CSS styles are in place.
let starSize = 1;   //the size of the star, an integer greater than 0.
let width = 0;      //holds the width of the whole div, the star, padding, and bordersize.
let xPos = 0;       //the x position used for movement
let isMoving = false;   //if the star is moving or not (so the movement handler doesn't stack)
let moveLength = 5; //how far the star moves each frame

window.onload = () => {
    let validIn = false;
    starSize = prompt(`Enter a positive integer greater than 0:`);

    while(!validIn)
    {
        //check that the input is a number
        if(!isNaN(starSize))
        {
            //check that the input is positive
            if(starSize >= 1)
            {
                validIn = true;
                //check for an even diamond or an odd diamond
                if(starSize % 2 === 0)
                {
                    //round down and make a star of that size
                    makeEvenStar(parseInt(starSize));
                }
                else
                {
                    //round down and make a star of that size
                    makeOddStar(parseInt(starSize));
                }
            }
            else
            {
                starSize = prompt(`Incorrect, enter a positive integer:`);
            }
        }
        else
        {
            starSize = prompt(`Incorrect, enter an integer:`);
        }

    }
};

//create the visuals for an odd sized star.
let makeOddStar = (input) =>{
    starSize = input;   //this is to make sure starSize is an integer
    let finalStar = ``; //to hold the star before putting it into the div
    let row, empt, strs = 0;

    //top half, starting from 0 to the middle
    for(row = 0; row < (parseInt((starSize / 2))+1); row++)
    {
        //add white space
        for(empt = 0; empt < parseInt(((starSize/2) - row)); empt++)
        {
            finalStar += `&nbsp`;
        }
        //add stars
        for(strs = 0; strs < (1 + 2 * row); strs++)
        {
            finalStar += `*`;
        }
        //add white space again
        for(empt = 0; empt < parseInt(((starSize/2) - row)); empt++)
        {
            finalStar += `&nbsp`;
        }
    }

    //bottom half, starting from zero to the end
    for(row = (parseInt((starSize / 2))-1); row >= 0; row--)
    {
        //add white space
        for(empt = 0; empt < parseInt(((starSize/2) - row)); empt++)
        {
            finalStar += `&nbsp`;
        }
        //add stars
        for(strs = 0; strs < (1 + 2 * row); strs++)
        {
            finalStar += `*`;
        }
        //add white space again
        for(empt = 0; empt < parseInt(((starSize/2) - row)); empt++)
        {
            finalStar += `&nbsp`;
        }
    }

    //set the div's content to be the final star
    star.innerHTML = finalStar;
    //set the width so that it wraps the content in a way that lines up.
    star.style.width = `${starSize * 8.8}px`;
    //set the linehight so it works for ODD sized stars.
    star.style.lineHeight = `8.8px`;
};

//make a star visual with even length
let makeEvenStar = (input) =>{
    starSize = input;   //this is to make sure starSize is even.
    let finalStar = ``; //to hold the star before putting it into the div
    let row, empt, strs = 0;

    //print the very top
    for(empt = 0; empt < starSize - 1; empt++)
    {
        finalStar += `&nbsp`;
    }
    //add stars
    finalStar += `&nbsp*`;
    //add white space again
    for(empt = 0; empt < starSize - 1; empt++)
    {
        finalStar += `&nbsp`;
    }
    //add an extra space for the right
    finalStar += `&nbsp`;
    //top half, starting from 0 to the middle
    for(row = 1; row < (parseInt((starSize / 2))+1); row++)
    {
        //add white space
        for(empt = 0; empt < parseInt((starSize/2) - row); empt++)
        {
            finalStar += `&nbsp&nbsp`;
        }
        //add stars
        for(strs = 0; strs < (2 * row); strs++)
        {
            finalStar += `&nbsp*`;
        }
        //add white space again
        for(empt = 0; empt < parseInt((starSize/2) - row); empt++)
        {
            finalStar += `&nbsp&nbsp`;
        }
        //add an extra space for the right
        finalStar += `&nbsp`;
    }
    //bottom half, starting from zero to the end
    for(row = (parseInt((starSize / 2))-1); row > 0; row--)
    {
        //add white space
        for(empt = 0; empt < parseInt((starSize/2) - row); empt++)
        {
            finalStar += `&nbsp&nbsp`;
        }
        //add stars
        for(strs = 0; strs < (2 * row); strs++)
        {
            finalStar += `&nbsp*`;
        }
        //add white space again
        for(empt = 0; empt < parseInt((starSize/2) - row); empt++)
        {
            finalStar += `&nbsp&nbsp`;
        }
        //add an extra space for the right
        finalStar += `&nbsp`;
    }
    //print the very bottom
    for(empt = 0; empt < starSize - 1; empt++)
    {
        finalStar += `&nbsp`;
    }
    //add stars
    finalStar += `&nbsp*`;
    //add white space again
    for(empt = 0; empt < starSize - 1; empt++)
    {
        finalStar += `&nbsp`;
    }
    //add an extra space for the right
    finalStar += `&nbsp`;

    //set the div's content to be the final star
    star.innerHTML = finalStar;
    //set the width so that it wraps the content in a way that lines up.
    //8.8 for line height (make it as square as possible), *2 since there are twice as many spaces,
    //and finally and extra 1 space to center it.
    star.style.width = `${starSize * 8.8 * 2 + 8.8}px`;
    //make sure the lineheight works for the spacing in EVEN stars.
    star.style.lineHeight = `17.9px`;
};

//at each frame, the movement handler changes the x position by the movelength.
let movementHandler = () =>{
    //check which wall is being touched.
    if(parseInt(star.style.left) === 0 || parseInt(star.style.left) >= parseInt(window.innerWidth) - width)
    {
        //flip directions
        moveLength *= -1;
    }
    //move the star by the incrament
    xPos+=moveLength;
    star.style.left = `${xPos}px`;
};

//when clicked, start moving the star.
star.addEventListener(`click`, () => {
    //only be clickable once.
    if (!isMoving)
    {
        //find the width of the whole div (including the content width we placed, and the padding and border)
        //NOTE, padding and border give NaN when using star.style, I believe because star.style referes to inline CSS within the html.
        //window.getComputedStyle(star) gets the CSS from the style document. This isn't entirely necessary, but it makes it so I can
        //tweak the padding and border without having literals in the Javascript.
        width = (parseInt(star.style.width) + (2 * parseInt(starStyle.padding)) + (2 * parseInt(starStyle.borderWidth)));
        setInterval(movementHandler, 10);
        isMoving = true;
    }
  });
