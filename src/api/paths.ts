const BASE_URL ='http://localhost:7000'

const MODULE_URL = `${BASE_URL}/todos`

export const TODO ={
    GET_ALL: MODULE_URL,
    ADD_TODO: MODULE_URL,
    TOGGLE_COMPLETE_TODO: (id: string):string => `${MODULE_URL}/${id}`,
    DELETE_TODO: (id: string):string => `${MODULE_URL}/${id}`
}
