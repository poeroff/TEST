class Tooltip {


}

class ProjectItem {
    constructor(id, updateProjectListsFunction){
        this.id = id;
        this.updateProjectLists = updateProjectListsFunction
        
        this.connectMoreInfoButton()
        this.connectSwitchButton();
        
        
    }
    connectSwitchButton(){


    }

    connectMoreInfoButton(){
        const projectItemElement = document.getElementById(this.id)
        const switchButton = projectItemElement.querySelector("button:last-of-type")
        switchButton.addEventListener("click",this.updateProjectLists)

    }


}

class ProjectList {

    projects = [];


    constructor(type,){
        this.type = type
        
        const prjItems = document.querySelectorAll(`#${type}-projects`);
        for(const pjItem of prjItems){
            
            this.projects.push(new ProjectItem(pjItem.id,this.switchproject.bind(this)))

        }
        

    }
    setSwitchhandlerFunction(switchHandlerFunction){

        this.switchhandler = switchHandlerFunction;
        
    }

    addproject(){
        console.log(this)

    }

    switchproject(projectId){
       
        this.switchhandler(this.projects.find( p => p.id === projectId))
        const projectIndex = this.projects.findIndex(p =>p.id === projectId)
        this.projects.splice(projectId,1)
        
       
    }

}

class App{
    static init(){
        const activeProjectsList = new ProjectList("active"); 
        const finishedProjectsList = new ProjectList("finished");    
        console.log(finishedProjectsList)
        activeProjectsList.setSwitchhandlerFunction(finishedProjectsList.addproject.bind(finishedProjectsList))
        finishedProjectsList.setSwitchhandlerFunction(activeProjectsList.addproject.bind(activeProjectsList))

    }

}

App.init();