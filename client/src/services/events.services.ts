import axios from 'axios'
import { INewEvent } from "../types/IEvent"

export async function getEvents(pageNumber: number, perPage: number) {
    try {
        const { data } = await axios.get(`/api/v1/events?page_number=${pageNumber}&per_page=${perPage}`);
        return data.data;
    } catch (error) {
        throw error
    }
}

export async function getEventCount(){
    try {
        const { data } = await axios.get('/api/v1/events/count'); 
        return data.data[0].count
        
    } catch (error) {
       throw error 
    }
}
export async function createNewEvent(event: INewEvent){
    try {
        const { data } = await axios.post('/api/v1/events', event); 
        return data
    } catch (error) {
       throw error 
    }

}
