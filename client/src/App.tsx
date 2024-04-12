import { useState } from "react";
import { MenuItem } from "./types/MenuItem";
import { PieChartOutlined, DesktopOutlined } from "@ant-design/icons";
import VerticalMenu from "./components/VerticalMenu";
import "./scss/styles.scss";
import EventsTable from "./components/Table";
import { Row, Col, Button, Alert } from "antd";
import { INewEvent } from "./types/IEvent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewEventModal from "./components/NewEventModal";
import { useEvents } from "./hooks/useEvents";
function App() {
    const items: MenuItem[] = [
        getItem("dashboard", "/dashboard", <PieChartOutlined />),
        getItem("events", "/events", <DesktopOutlined />),
    ];

    const [showNewEventModal, setShowNewEventModal] = useState<boolean>(false);
    const [addSuccess, setAddSuccess] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const { events, totalEvents, perPage, handlePaginationChange, createEvent } =
        useEvents();

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

    function toggleNewEventForm() {
        setShowNewEventModal((flag: boolean) => !flag);
    }
    async function onCreateNewEvent(event: INewEvent) {
        try {
            setValidationErrors([]);
            setAddSuccess(false);
            await createEvent(event);
            setAddSuccess(true);
        } catch (error: any) {
            if (error.response.status === 400) {
                setValidationErrors(error.response.data);
            }
        }
    }

    return (
        <BrowserRouter>
            <div className="app-container">
                {validationErrors.length > 0 && (
                    <Alert
                        message="Validation Errors!"
                        description={
                            <ul>
                                {validationErrors.map((error) => (
                                    <li>{error}</li>
                                ))}
                            </ul>
                        }
                        type="error"
                        showIcon
                    />
                )}
                {addSuccess && <Alert message="Event Added!" type="success" showIcon />}
                <Button onClick={toggleNewEventForm}>Add New Event</Button>
                {showNewEventModal && (
                    <NewEventModal
                        handleCancel={toggleNewEventForm}
                        handleSubmit={onCreateNewEvent}
                    />
                )}
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
                                        totalEvents={totalEvents}
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
                                        totalEvents={totalEvents}
                                        onPaginationChange={handlePaginationChange}
                                        events={events}
                                    />
                                }
                            />
                        </Routes>
                    </Col>
                </Row>
            </div>
        </BrowserRouter>
    );
}

export default App;
