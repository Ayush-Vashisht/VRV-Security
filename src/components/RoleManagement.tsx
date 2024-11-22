"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Check } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

const initialRoles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  { id: 3, name: "Viewer", permissions: ["Read"] },
];

const allPermissions = ["Read", "Write", "Delete"];

export default function RoleManagement({
  searchQuery,
  activeFilter,
}: {
  searchQuery: string;
  activeFilter: string;
}) {
  const [roles, setRoles] = useState(initialRoles);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const filteredRoles = useMemo(() => {
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (activeFilter === "All" ||
          (activeFilter === "With Delete" &&
            role.permissions.includes("Delete")) ||
          (activeFilter === "Without Delete" &&
            !role.permissions.includes("Delete")))
    );
  }, [roles, searchQuery, activeFilter]);

  const handleAddRole = () => {
    setRoles([...roles, { id: roles.length + 1, ...newRole }]);
    setNewRole({ name: "", permissions: [] });
    setIsAddingRole(false);
  };

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handlePermissionChange = (permission: string) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number) => {
    setEditingId(null);
    // Here you would typically update the role data
  };

  const handlePermissionToggle = (roleId: number, permission: string) => {
    setRoles(
      roles.map((role) => {
        if (role.id === roleId) {
          const updatedPermissions = role.permissions.includes(permission)
            ? role.permissions.filter((p) => p !== permission)
            : [...role.permissions, permission];
          return { ...role, permissions: updatedPermissions };
        }
        return role;
      })
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex justify-end">
        <Dialog open={isAddingRole} onOpenChange={setIsAddingRole}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Role
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Role Name"
                value={newRole.name}
                onChange={(e) =>
                  setNewRole({ ...newRole, name: e.target.value })
                }
                className="bg-gray-700 text-white border-gray-600"
              />
              <div>
                <h4 className="mb-2 font-semibold">Permissions</h4>
                {allPermissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={`permission-${permission}`}
                      checked={newRole.permissions.includes(permission)}
                      onCheckedChange={() => handlePermissionChange(permission)}
                    />
                    <label
                      htmlFor={`permission-${permission}`}
                      className="text-white"
                    >
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Button
              onClick={handleAddRole}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Role
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 bg-gray-800">
            <TableHead className="text-gray-300">Role Name</TableHead>
            <TableHead className="text-gray-300">Permissions</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRoles.map((role) => (
            <TableRow key={role.id} className="border-gray-700">
              <TableCell className="font-medium">
                {editingId === role.id ? (
                  <Input
                    value={role.name}
                    onChange={(e) => {
                      const updatedRoles = roles.map((r) =>
                        r.id === role.id ? { ...r, name: e.target.value } : r
                      );
                      setRoles(updatedRoles);
                    }}
                    className="bg-gray-700 text-white border-gray-600"
                  />
                ) : (
                  role.name
                )}
              </TableCell>
              <TableCell>
                {editingId === role.id ? (
                  <div className="flex flex-wrap gap-2">
                    {allPermissions.map((permission) => (
                      <div
                        key={permission}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`permission-${role.id}-${permission}`}
                          checked={role.permissions.includes(permission)}
                          onCheckedChange={() =>
                            handlePermissionToggle(role.id, permission)
                          }
                          
                        />
                        <label htmlFor={`permission-${role.id}-${permission}`}>
                          {permission}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className={`${
                          permission === "Read"
                            ? "bg-green-500 text-white px-2 py-1 rounded"
                            : permission === "Write"
                            ? "bg-gray-400 text-white px-2 py-1 rounded"
                            : permission === "Delete"
                            ? "bg-red-500 text-white px-2 py-1 rounded"
                            : ""
                        }`}
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                )}
              </TableCell>

              <TableCell>
                {editingId === role.id ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSave(role.id)}
                    className="text-gray-300 hover:text-white hover:bg-gray-500"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(role.id)}
                    className="text-gray-300 hover:text-white hover:bg-gray-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteRole(role.id)}
                  className="text-gray-300 hover:text-white hover:bg-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
