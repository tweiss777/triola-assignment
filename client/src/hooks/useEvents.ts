import { useEffect, useState } from "react";
import {
    getEventCount,
    getEvents,
    createNewEvent,
} from "../services/events.services";
import { IEvent, INewEvent } from "../types/IEvent";
import { useLoadingContext } from "./useLoadingContext";
export function useEvents() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalEvents, setTotalEvents] = useState<number>(0);
    const { setLoading } = useLoadingContext();
    async function fetchData() {
        const retrievedEvents = await getEvents(pageNumber, perPage);
        const totalEntries = await getEventCount();
        setTotalEvents(totalEntries);
        setEvents(retrievedEvents);
    }

    async function handlePaginationChange(page: number, pageSize: number) {
        setPageNumber(page);
        setPerPage(pageSize);
        await fetchData();
    }
    useEffect(() => {
        async function getData() {
            try {
                const retrievedEvents = await getEvents(pageNumber, perPage);
                const totalEntries = await getEventCount();
                setTotalEvents(totalEntries);
                setEvents(retrievedEvents);
                setLoading(true);
            } catch (error) {
                throw error;
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    async function createEvent(event: INewEvent) {
        try {
            await createNewEvent(event);
        } catch (error) {
            throw error;
        }
    }

    return {
        events,
        totalEvents,
        pageNumber,
        perPage,
        handlePaginationChange,
        createEvent,
    };
}
