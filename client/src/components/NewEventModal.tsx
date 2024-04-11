import { Button, DatePicker, Input } from "antd";
import { IEvent, INewEvent } from "../types/IEvent";
import "../scss/new-event-styles.scss";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react";

type IProps = {
    handleSubmit: (values: IEvent) => void;
    handleCancel: () => void;
};

const dateFormat = "YYYY-MM-DD";
dayjs.extend(customParseFormat);
export default function NewEventModal(props: IProps) {
    const [newEvent, setNewEvent] = useState<INewEvent>({
        title: "",
        description: "",
        date: "",
        location: "",
    });

    function onSubmit() {
        console.log(newEvent);
        props.handleSubmit(newEvent);
    }
    function onCancel() {
        props.handleCancel();
    }
    const { TextArea } = Input;
    return (
        <div className="new-event-container">
            <span className="cancel-btn" onClick={onCancel}>
                X
            </span>
            <div className="new-event-form">
                <div className="new-event-header">
                    <h1>New Event</h1>
                </div>
                <div className="row title">
                    <h2>Title</h2>
                    <Input
                        onChange={(e) =>
                            setNewEvent({ ...newEvent, title: e.target.value })
                        }
                        placeholder="title"
                        name="title"
                    />
                </div>
                <div className="row description">
                    <h2>Description</h2>
                    <TextArea
                        onChange={(e) =>
                            setNewEvent({ ...newEvent, description: e.target.value })
                        }
                        placeholder="description"
                        name="description"
                    />
                </div>
                <div className="row date">
                    <h2>Date</h2>
                    <DatePicker
                        onChange={(_date, dateString) =>
                            setNewEvent({ ...newEvent, date: dateString })
                        }
                        placeholder="date"
                        name="date"
                        format={dateFormat}
                    />
                </div>
                <div className="row location">
                    <h2>Location</h2>
                    <Input
                        onChange={(e) =>
                            setNewEvent({ ...newEvent, location: e.target.value })
                        }
                        placeholder="location"
                        name="location"
                    />
                </div>
            </div>
            <div className="submit-btn">
                <Button type="primary" onClick={onSubmit}>
                    Create Event
                </Button>
            </div>
        </div>
    );
}
