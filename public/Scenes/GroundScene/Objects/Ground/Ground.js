import {
    AxesHelper,
    DoubleSide,
    Mesh,
    PlaneGeometry,
    ShaderMaterial,
  } from 'three';
import { getLocalFile } from '../../../../Helpers/Helpers.js';
  
  class Ground {
    constructor() {

      this._shaderPromise = Promise.all([
        getLocalFile('/Scenes/GroundScene/Objects/Ground/Scripts/fragment.glsl')
          .then(_ => this._fragmentScript = _),
        getLocalFile('/Scenes/GroundScene/Objects/Ground/Scripts/gradientFragment.glsl')
          .then(_ => this._gradientFragmentScript = _),
        getLocalFile('/Scenes/GroundScene/Objects/Ground/Scripts/waveFragment.glsl')
          .then(_ => this._waveFragment = _),

        getLocalFile('/Scenes/GroundScene/Objects/Ground/Scripts/vertex.glsl')
          .then(_ => this._vertexScript = _),
        getLocalFile('/Scenes/GroundScene/Objects/Ground/Scripts/irregularVertex.glsl')
          .then(_ => this._irregularVertexScript = _),
      ]);

      this._fragmentListCallbacks = {
        "Malha Verde": () => this._fragmentScript,
        "Malha Gradiente": () => this._gradientFragmentScript,
        "Malha Água": () => this._waveFragment,
      }

      this._selectedFragmentCallback = Object.keys(this._fragmentListCallbacks)[0]


      this._shaderPromise.then(() => {
        this._material = this.getMaterial();
        this._provider = new Mesh(this.getGeometry(), this._material);
        this._provider.rotateX((-90.0 * Math.PI) / 180.0);

        this._axes = new AxesHelper(8.0);
        this._axes.position.y = 0.2;
        this._axes.updateMatrix();
        this._provider.add(this._axes);
      })

      this._time = 1.0


      this._useRotate = false
      this._amplitude = 1.0;
      this._gradientHeight = 10.0;
      this._centerGradient = 0.0;
      this._irregularMode = false;
      this._gradientMode = false;
      this._modeMesh = true;
      this._segmentsCount = 50
      this._useWave = false

    }
  
    getGeometry() {
      return new PlaneGeometry(
        100,
        100,
        Math.round(this._segmentsCount),
        Math.round(this._segmentsCount),
      );
    }
  
    getMaterial() {
      const uniforms = {
        uAmp: {
          type: 'f',
          value: this._amplitude,
        },
        uTime: {
          type: 'f',
          value: this._time,
        },
        fHeight: {
          type: 'f',
          value: this._gradientHeight
        },
        fCenter: {
          type: 'f',
          value: this._centerGradient,
        },
      };
      return new ShaderMaterial({
        uniforms: uniforms,
        vertexShader: this._irregularMode
          ? this._irregularVertexScript
          : this._vertexScript,
        fragmentShader: this._fragmentListCallbacks[this._selectedFragmentCallback](),
        wireframe: this._modeMesh,
        side: DoubleSide,
      });
    }
  
    getProvider() {
      return this._provider;
    }

    getAsyncProvider() {
      return this._shaderPromise.then(() => this.getProvider());
    }
  
    onUpdate() {
      if ( this._useWave ) {
        this._time = ( this._time + 0.005 ) % 360;
        console.log(this._time)
      }

      this._shaderPromise.then(() => {
        if (this._useRotate) {
          this._provider.rotateZ(0.001);
          this._provider.updateMatrix();
        }
      })
      this.onChange();
      return this;
    }
  
    getUuid() {
      return this._provider.uuid;
    }
  
    onMenu(aMenu) {
      aMenu
        .getProvider()
        .add(this, '_amplitude', 0.1, 20.0)
        .name('Amplitude')
        .onChange(() => this.onChange());
      aMenu
        .getProvider()
        .add(this, '_segmentsCount', 50, 1000)
        .name('Segmentos')
        .onChange(() => this.onChange());
      aMenu
        .getProvider()
        .add(this, '_useWave')
        .name('Modo Ondas')
        .onChange(() => this.onChange());
  
      aMenu
        .getProvider()
        .add(this, '_modeMesh')
        .name('Modo Malha')
        .onChange(() => this.onChange());
  
      aMenu
        .getProvider()
        .add(this, '_gradientMode')
        .name('Modo Gradiente')
        .onChange(() => this.onChange());
      aMenu
        .getProvider()
        .add(this, '_useRotate')
        .name('Ativar Rotação')
        .onChange(() => this.onChange());
  
      aMenu
        .getProvider()
        .add(this, '_irregularMode')
        .name('Modo Irregular')
        .onChange(() => this.onChange());
  
      aMenu
        .getProvider()
        .add(this, '_gradientHeight', 1, 20)
        .name('Altura Gradiente')
        .onChange(() => this.onChange());

      aMenu
          .getProvider()
          .add(this, '_selectedFragmentCallback', Object.keys(this._fragmentListCallbacks))
          .name('Framento Selecionado')
  
      aMenu
        .getProvider()
        .add(this, '_centerGradient', -10, 10)
        .name('Centro do Gradiente')
        .onChange(() => this.onChange());
      return aMenu;
    }
  
    onChange() {
      this._shaderPromise.then(() => {
        this._provider.material = this.getMaterial();
        this._provider.geometry = this.getGeometry();
      })
    }
  }
  
  export default Ground;
  