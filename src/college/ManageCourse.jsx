import React, { useEffect, useState } from "react";
import { Button, Table, Input, Modal, Form } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined, PlusOutlined } from "@ant-design/icons";
import { deleteCourseAPI, getCoursesAPI, updateCourseAPI, addCourseAPI } from "../services/allAPI";

const ManageCourse = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    const [courses, setCourses] = useState([]);
    const [editingCourseId, setEditingCourseId] = useState(null);
    const [editedCourse, setEditedCourse] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newCourse, setNewCourse] = useState({ name: "", duration: "", fee: "" });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await getCoursesAPI(headers);
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleEdit = (course) => {
        setEditingCourseId(course.id);
        setEditedCourse({ ...course });
    };

    const handleInputChange = (e, field) => {
        setEditedCourse({ ...editedCourse, [field]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await updateCourseAPI(editingCourseId, editedCourse, headers);
            setEditingCourseId(null);
            fetchCourses();
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    const handleDelete = async (courseId) => {
        try {
            await deleteCourseAPI(courseId, headers);
            fetchCourses();
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    const showAddModal = () => {
        setIsModalVisible(true);
    };

    const handleNewCourseChange = (e, field) => {
        setNewCourse({ ...newCourse, [field]: e.target.value });
    };

    const handleAddCourse = async () => {
        try {
            await addCourseAPI([newCourse], headers);
            setIsModalVisible(false);
            setNewCourse({ name: "", duration: "", fee: "" });
            fetchCourses();
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal} style={{ marginBottom: 16 }}>
                Add Course
            </Button>

            <Table dataSource={courses} rowKey="id" pagination={{ pageSize: 7 }}>
                <Table.Column title="Course Name" dataIndex="name" key="name"
                    render={(text, record) =>
                        editingCourseId === record.id ? (
                            <Input value={editedCourse.name} onChange={(e) => handleInputChange(e, "name")} />
                        ) : (
                            text
                        )
                    }
                />
                <Table.Column title="Duration (Years)" dataIndex="duration" key="duration"
                    render={(text, record) =>
                        editingCourseId === record.id ? (
                            <Input type="number" value={editedCourse.duration} onChange={(e) => handleInputChange(e, "duration")} />
                        ) : (
                            text
                        )
                    }
                />
                <Table.Column title="Fee (₹)" dataIndex="fee" key="fee"
                    render={(text, record) =>
                        editingCourseId === record.id ? (
                            <Input type="number" value={editedCourse.fee} onChange={(e) => handleInputChange(e, "fee")} />
                        ) : (
                            text
                        )
                    }
                />
                <Table.Column
                    title="Actions"
                    key="actions"
                    render={(text, record) => (
                        <>
                            {editingCourseId === record.id ? (
                                <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} />
                            ) : (
                                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                            )}
                            <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} style={{ marginLeft: 8 }} />
                        </>
                    )}
                />
            </Table>

            {/* Add Course Modal */}
            <Modal title="Add Course" visible={isModalVisible} onOk={handleAddCourse} onCancel={() => setIsModalVisible(false)}>
                <Form layout="vertical">
                    <Form.Item label="Course Name">
                        <Input value={newCourse.name} onChange={(e) => handleNewCourseChange(e, "name")} />
                    </Form.Item>
                    <Form.Item label="Duration (Years)">
                        <Input type="number" value={newCourse.duration} onChange={(e) => handleNewCourseChange(e, "duration")} />
                    </Form.Item>
                    <Form.Item label="Fee (₹)">
                        <Input type="number" value={newCourse.fee} onChange={(e) => handleNewCourseChange(e, "fee")} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageCourse;
