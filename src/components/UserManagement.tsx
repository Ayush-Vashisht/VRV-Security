"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    status: "Inactive",
  },
];

function AddUserDialog({
  isOpen,
  onClose,
  onAddUser,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: Omit<User, "id">) => void;
}) {
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const handleAddUser = () => {
    onAddUser(newUser);
    setNewUser({ name: "", email: "", role: "", status: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="bg-gray-700 text-white border-gray-600"
          />
          <Input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="bg-gray-700 text-white border-gray-600"
          />
          <Select
            value={newUser.role}
            onValueChange={(value) => setNewUser({ ...newUser, role: value })}
          >
            <SelectTrigger className="bg-gray-700 text-white border-gray-600">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Editor">Editor</SelectItem>
              <SelectItem value="Viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={newUser.status}
            onValueChange={(value) => setNewUser({ ...newUser, status: value })}
          >
            <SelectTrigger className="bg-gray-700 text-white border-gray-600">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleAddUser}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Add User
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function EditUserDialog({
  isOpen,
  onClose,
  user,
  onEditUser,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onEditUser: (id: number, updatedUser: Omit<User, "id">) => void;
}) {
  const [editedUser, setEditedUser] = useState<Omit<User, "id">>({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  });

  const handleEditUser = () => {
    onEditUser(user.id, editedUser);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Name"
            value={editedUser.name}
            onChange={(e) =>
              setEditedUser({ ...editedUser, name: e.target.value })
            }
            className="bg-gray-700 text-white border-gray-600"
          />
          <Input
            placeholder="Email"
            value={editedUser.email}
            onChange={(e) =>
              setEditedUser({ ...editedUser, email: e.target.value })
            }
            className="bg-gray-700 text-white border-gray-600"
          />
          <Select
            value={editedUser.role}
            onValueChange={(value) =>
              setEditedUser({ ...editedUser, role: value })
            }
          >
            <SelectTrigger className="bg-gray-700 text-white border-gray-600">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Editor">Editor</SelectItem>
              <SelectItem value="Viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={editedUser.status}
            onValueChange={(value) =>
              setEditedUser({ ...editedUser, status: value })
            }
          >
            <SelectTrigger className="bg-gray-700 text-white border-gray-600">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleEditUser}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default function UserManagement({
  searchQuery,
  activeFilter,
}: {
  searchQuery: string;
  activeFilter: string;
}) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (activeFilter === "All" || user.role === activeFilter)
    );
  }, [users, searchQuery, activeFilter]);

  const handleAddUser = (newUser: Omit<User, "id">) => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
  };

  const handleEditUser = (id: number, updatedUser: Omit<User, "id">) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
    );
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex justify-end">
        <Button
          variant="outline"
          className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
          onClick={() => setIsAddingUser(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 bg-gray-800">
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Role</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id} className="border-gray-700">
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge
                  variant={user.status === "Active" ? "success" : "destructive"}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white hover:bg-gray-500"
                  onClick={() => setEditingUser(user)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-gray-300 hover:text-white hover:bg-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddUserDialog
        isOpen={isAddingUser}
        onClose={() => setIsAddingUser(false)}
        onAddUser={handleAddUser}
      />
      {editingUser && (
        <EditUserDialog
          isOpen={true}
          onClose={() => setEditingUser(null)}
          user={editingUser}
          onEditUser={handleEditUser}
        />
      )}
    </motion.div>
  );
}
