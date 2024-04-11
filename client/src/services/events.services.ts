import axios from 'axios'
import { IEvent } from "../types/IEvent"

export async function getEvents(pageNumber: number, perPage: number) {
    const { data } = await axios.get(`/api/v1/events?page_number=${pageNumber}&per_page=${perPage}`);
    return data.data;
}

export async function getEventCount(){
    const { data } = await axios.get('/api/v1/events/count'); 
    return data.data[0].count
}
