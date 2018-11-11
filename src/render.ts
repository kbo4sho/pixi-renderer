import { Render, Engine } from "../node_modules/@types/matter-js/index";

export class MyRender {
    public width = 300;
    public render:Render = null;
    public create(engine: Engine){
         this.render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: 800,
                height: 600
            }
        });
    }


}