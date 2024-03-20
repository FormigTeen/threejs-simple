//import GroundScene from './Scenes/GroundScene/GroundScene.js';
//import BezierScene from './Scenes/BezierScene/BezierScene';
import Application from './Application.js';
import ScenesMenu from './Objects/ScenesMenu.js';
//import SolarScene from './Scenes/SolarScene/SolarScene';
//import TravelScene from './Scenes/TravelScene/TravelScene';
//import TableScene from '@/Scenes/TableScene/TableScene';
import StartScene from './Scenes/StartScene/StartScene.js'
import CubeScene from './Scenes/CubeScene/CubeScene.js'

new Application()
    .useMenu()
    //.addScene(new BezierScene())
    //.addScene(new TableScene())
    //.addScene(new GroundScene())
    //.addScene(new TravelScene())
    //.addScene(new SolarScene())
    //.addScene(new StartScene())
    .addScene(new CubeScene())
    .onFuncMenu((_, anApp) => anApp.onMenu(new ScenesMenu(_)))
    .onBoot();
