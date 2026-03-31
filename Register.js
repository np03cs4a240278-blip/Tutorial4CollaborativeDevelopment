import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Select, Card, message, Typography, DatePicker } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("ne_users") || "[]");
      const exists = users.find((u) => u.email === values.email);
      if (exists) {
        message.error("Email already registered. Please login.");
        setLoading(false);
        return;
      }
      const newUser = {
        id: Date.now(),
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone || "",
        dob: values.dob ? values.dob.format("YYYY-MM-DD") : "",
        role: values.role,
      };
      users.push(newUser);
      localStorage.setItem("ne_users", JSON.stringify(users));
      message.success("Account created! Please login. 🎉");
      navigate("/login");
      setLoading(false);
    }, 800);
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay} />
      <Card style={styles.card} bordered={false}>
        <div style={styles.header}>
          <span style={{ fontSize: 40 }}>🇳🇵</span>
          <Title level={2} style={styles.title}>Create Account</Title>
          <Text style={styles.subtitle}>Join Nepal Events today</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish} size="large">
          <Form.Item name="role" label="Register As" rules={[{ required: true }]} initialValue="user">
            <Select>
              <Select.Option value="user">👤 User</Select.Option>
              <Select.Option value="admin">🛠 Admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined />} placeholder="Ram Bahadur Thapa" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input prefix={<MailOutlined />} placeholder="you@example.com" />
          </Form.Item>

          <Form.Item name="phone" label="Phone Number">
            <Input prefix={<PhoneOutlined />} placeholder="+977 98XXXXXXXX" />
          </Form.Item>

          <Form.Item name="dob" label="Date of Birth">
            <DatePicker style={{ width: "100%" }} placeholder="Select date of birth" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Min 6 characters" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) return Promise.resolve();
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Re-enter password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={styles.btn}
          >
            Create Account
          </Button>
        </Form>

        <div style={styles.footer}>
          <Text>Already have an account? </Text>
          <Link to="/login" style={{ color: "#c0392b", fontWeight: 600 }}>Sign in</Link>
        </div>
      </Card>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #8B0000 0%, #c0392b 40%, #e67e22 100%)",
    padding: 20,
    position: "relative",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "url('https://picsum.photos/id/133/1920/1080') center/cover no-repeat",
    opacity: 0.15,
  },
  card: {
    width: "100%",
    maxWidth: 460,
    borderRadius: 16,
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    position: "relative",
    zIndex: 1,
  },
  header: { textAlign: "center", marginBottom: 24 },
  title: { margin: "8px 0 4px", color: "#8B0000", fontFamily: "Georgia, serif" },
  subtitle: { color: "#666" },
  btn: {
    background: "linear-gradient(90deg, #8B0000, #c0392b)",
    border: "none",
    height: 44,
    fontWeight: 700,
    fontSize: 16,
    marginTop: 8,
  },
  footer: { textAlign: "center", marginTop: 16 },
};
