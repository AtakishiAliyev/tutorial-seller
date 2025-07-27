import { Tabs, Form, Input, Button } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import CardOrder from "../components/dashboard/CardOrder";

const { TabPane } = Tabs;

const UserProfile = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const orders = [
    {
      id: 1,
      title: "SIFIRDAN ZIRVEYE YOUTUBE OTOMASYONU",
      price: "49.99",
      thumbnail:
        "https://static-media.hotmart.com/B5i1rbX1m-JXZrQxbOzA5C5HrDo=/848x478/https://uploads.teachablecdn.com/attachments/vSeS9ThvTBycyRQCszKf_SIFIRDAN+ZI%CC%87RVEYE+YT+KAPAG%CC%86II.jpg",
      purchaseDate: "2023-10-26",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Account Settings
          </h1>
          <p className="mt-2 text-md text-gray-600">
            Manage your profile, password, and view order history.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Tabs
            defaultActiveKey="1"
            size="large"
            className="profile-tabs"
            centered
          >
            <TabPane tab="Profile" key="1">
              <div className="p-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    This information is read-only.
                  </p>
                </div>
                <Form
                  layout="vertical"
                  initialValues={{
                    name: "John Doe",
                    email: "john.doe@example.com",
                    phone: "+1 234 567 890",
                  }}
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"
                >
                  <Form.Item label="Full Name" name="name">
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      disabled
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item label="Email Address" name="email">
                    <Input
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      disabled
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item label="Phone Number" name="phone">
                    <Input
                      prefix={<PhoneOutlined className="site-form-item-icon" />}
                      disabled
                      size="large"
                    />
                  </Form.Item>
                </Form>

                <div className="border-t border-gray-200 my-8"></div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Change Password
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose a strong password and don&apos;t reuse it for other
                    accounts.
                  </p>
                </div>
                <Form
                  name="change-password"
                  layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className="mt-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <Form.Item
                      label="Current Password"
                      name="currentPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please input your current password!",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        size="large"
                        placeholder="Current Password"
                      />
                    </Form.Item>
                    <Form.Item
                      label="New Password"
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please input your new password!",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        size="large"
                        placeholder="New Password"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Confirm New Password"
                      name="confirmNewPassword"
                      dependencies={["newPassword"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your new password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The passwords you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        size="large"
                        placeholder="Confirm New Password"
                      />
                    </Form.Item>
                  </div>
                  <Form.Item className="mt-6 flex justify-end">
                    <Button type="primary" htmlType="submit" size="large">
                      Update Password
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </TabPane>

            <TabPane tab="My Orders" key="2">
              <div className="p-8">
                <div className="space-y-4">
                  {orders.map((order) => (
                    <CardOrder key={order.id} order={order} />
                  ))}
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
