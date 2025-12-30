export const initialSemesterState=[
    {
        sem1:{
            sub1:"",
            sub2:"",
            sub3:""
        }
    },
    {
        sem2:{
            sub1:"",
            sub2:"",
            sub3:""
        }
    },
    {
        cgpa:""
    }
]

export function semesterReducer(state,action){
    switch(action.type){
        case "SET_MARK":{
            const newState=[...state]
            const {semIndex,semName,field,value}=action.payload;
            newState[semIndex][semName][field]=value;
            return newState
        }
        case "SET_CGPA":{
            const newState=[...state];
            newState[2].cgpa=action.payload;
            return newState
        }
        case "SET_ALL_SEMESTER":
            return action.payload;
    }
}