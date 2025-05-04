const star = document.querySelector(`div`);
let starSize = 1;

window.onload = () => {
    let validIn = false;
    starSize = prompt(`Enter a positive integer greater than 0:`);
    console.log(starSize);

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
    let starSize = input;   //this is to make sure starSize is an integer
    let finalStar = ``;
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
            console.log(empt);
            console.log(((starSize/2) - row));
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
            console.log(empt);
            console.log(((starSize/2) - row));
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
    let starSize = input;   //this is to make sure starSize is even.
    let finalStar = ``;
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

    //set the div's content to be the final star
    star.innerHTML = finalStar;
    //set the width so that it wraps the content in a way that lines up.
    star.style.width = `${starSize * 8.8 * 2}px`;
    //make sure the lineheight works for the spacing in EVEN stars.
    star.style.lineHeight = `17.9px`;
};
