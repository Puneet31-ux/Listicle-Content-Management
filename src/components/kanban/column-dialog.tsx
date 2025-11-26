'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useKanbanStore } from '@/store/kanban-store'
import { Column } from '@/lib/types'

interface ColumnDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  column?: Column
}

export function ColumnDialog({
  open,
  onOpenChange,
  column,
}: ColumnDialogProps) {
  const [title, setTitle] = useState('')

  const addColumn = useKanbanStore((state) => state.addColumn)
  const updateColumn = useKanbanStore((state) => state.updateColumn)
  const deleteColumn = useKanbanStore((state) => state.deleteColumn)
  const columns = useKanbanStore((state) => state.columns)

  useEffect(() => {
    if (column) {
      setTitle(column.title)
    } else {
      setTitle('')
    }
  }, [column, open])

  const handleSave = () => {
    if (!title.trim()) return

    if (column) {
      updateColumn(column.id, {
        title: title.trim(),
      })
    } else {
      addColumn({
        title: title.trim(),
        order: columns.length,
      })
    }

    onOpenChange(false)
  }

  const handleDelete = () => {
    if (
      column &&
      confirm(
        'Are you sure you want to delete this column? Tasks will be moved to the first column.'
      )
    ) {
      deleteColumn(column.id)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{column ? 'Edit Column' : 'Add New Column'}</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Column Name <span className="text-danger-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter column name..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave()
                }
              }}
            />
          </div>
        </div>

        <DialogFooter>
          {column && columns.length > 1 && (
            <Button variant="danger" onClick={handleDelete} className="mr-auto h-10 px-4 text-sm">
              Delete
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="secondary" className="h-10 px-4 text-sm">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={!title.trim()} className="h-10 px-4 text-sm">
            {column ? 'Save Changes' : 'Create Column'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
