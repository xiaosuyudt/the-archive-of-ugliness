
var app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xFFFFFF,
  
});

document.body.appendChild(app.view);

const infoContainer = document.getElementById('info-container');


//copy from pixi viewport website
const viewport = new Viewport.Viewport({

  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 1000,
  worldHeight: 1000,
  interaction: app.renderer.plugins.interaction
});



//be able to do these things 
viewport 
    .drag()
    .pinch()
    .wheel()
    .decelerate()

//app viewport to the stage
app.stage.addChild(viewport);

const positionDict = {};


for(var i = 0; i < positions.length; i++) {
  const filename = positions[i].filename
  const name = filename;

  app.loader.add(name, filename)

  positionDict[name] = positions[i];
}

//called when images are loaded
app.loader.load((loader, resources) =>{

console.log('loaded')

  for(key in resources){
    const imageSprite = new PIXI.Sprite(resources[key].texture);

    const clusterPos = positionDict[key].cluster_pos;

    imageSprite.x = 10 * app.renderer.width * (clusterPos[0] * 2 - 1);
    imageSprite.y = 10 * app.renderer.width * (clusterPos[1] * 2 - 1);

    imageSprite.anchor.x = 0.5;
    imageSprite.anchor.y = 0.5;



    imageSprite.interactive = true;

    const filename = key;
    imageSprite.on('click', () => {
      infoContainer.innerHTML = `<h2>${filename}</h2>`;
      infoContainer.style.opacity = "1";
    });
    
    imageSprite.on('mouseover', () => {
      imageSprite.height = imageSprite.height * 1.5;
      imageSprite.width = imageSprite.width * 1.5;
      
      //change z index
    });

    imageSprite.on('mouseout', () => {
      imageSprite.height = imageSprite.height * .75;
      imageSprite.width = imageSprite.width * .75;

      //change z index
    });

    viewport.addChild(imageSprite);

  }
}
)

