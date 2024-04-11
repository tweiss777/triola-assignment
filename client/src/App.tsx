import { getEventCount, getEvents, createNewEvent } from "./services/events.services";
import { useEffect, useRef, useState } from "react";
import { MenuItem } from "./types/MenuItem";
import { PieChartOutlined, DesktopOutlined } from "@ant-design/icons";
import VerticalMenu from "./components/VerticalMenu";
import "./scss/styles.scss";
import { useLoadingContext } from "./contexts/LoadingContext";
import EventsTable from "./components/Table";
import { Row, Col, Button, Alert } from "antd";
import { IEvent, INewEvent } from "./types/IEvent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewEventModal from "./components/NewEventModal";

function App() {
    const items: MenuItem[] = [
        getItem("dashboard", "/dashboard", <PieChartOutlined />),
        getItem("events", "/events", <DesktopOutlined />),
    ];

    const { setLoading } = useLoadingContext();
    const [events, setEvents] = useState<IEvent[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const totalEvents = useRef<number>(0);
    const [showNewEventModal, setShowNewEventModal] = useState<boolean>(false);
    const [addSuccess, setAddSuccess] = useState<boolean>(false);

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: "group",
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }

    useEffect(() => {
        async function getData() {
            await fetchData();
        }
        getData();
    }, []);
    async function fetchData() {
        setLoading(true);
        const retrievedEvents = await getEvents(pageNumber, perPage);
        const totalEntries = await getEventCount();
        totalEvents.current = totalEntries;
        setEvents(retrievedEvents);
        setLoading(false);
    }

    async function handlePaginationChange(page: number, pageSize: number) {
        setPageNumber(page);
        setPerPage(pageSize);
        await fetchData();
    }
    function toggleNewEventForm(){
        setShowNewEventModal((flag: boolean) => !flag)

    }
    async function onCreateNewEvent(event: INewEvent){
        try {
            setAddSuccess(false);
            await createNewEvent(event);
            setAddSuccess(true);
        } catch (error) {
            throw error 
        }

    }

    return (
        <BrowserRouter>
            <div className="app-container">
                { addSuccess && <Alert  message="Event Added!" type="success" showIcon/> }
                <Button onClick={toggleNewEventForm}>Add New Event</Button>
               {showNewEventModal && <NewEventModal handleCancel={toggleNewEventForm} handleSubmit={onCreateNewEvent} /> } 
                <Row gutter={16}>
                    <Col span={4}>
                        <VerticalMenu menuItems={items} />
                    </Col>
                    <Col span={16}>
                        <Routes>
                            <Route
                                path="/dashboard"
                                element={
                                    
                                    <EventsTable
                                        perPage={perPage}
                                        totalEvents={totalEvents.current}
                                        onPaginationChange={handlePaginationChange}
                                        events={events}
                                    />
                                }
                            />
                            <Route
                                path="/events"
                                element={
                                    <EventsTable
                                        perPage={perPage}
                                        totalEvents={totalEvents.current}
                                        onPaginationChange={handlePaginationChange}
                                        events={events}
                                    />
                                }
                            />
                        </Routes>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </div>
        </BrowserRouter>
    );
}

export default App;
