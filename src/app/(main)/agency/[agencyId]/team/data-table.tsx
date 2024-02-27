"use Client"
import React from 'react'
import {Table, TableBody} from '@/components/ui/table'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useModal } from '@/providers/modal-provider'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'

type Props = {}

interface DataTableProps<TData, TValue> {
    columns:ColumnDef<TData, TValue>[]
    data: TData[]
    filterValue: string
    actionButtonText?: React.ReactNode
    modalChildren?: React.ReactNode
}

export default function DataTable<TData, TValue> ({
    columns,
    data,
    filterValue,
    actionButtonText,
    modalChildren
}: DataTableProps<TData, TValue>) {
    const { setOpen } = useModal()
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })
    return (
        <>
            <div className='flex items-center justify-between'>
                <div className='flex items-center py-4 gap-2'>
                    <Search />
                    <Input placeholder='Search Name...' 
                        value={(table.getColumn(filterValue)?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn(filterValue)?.setFilterValue(event.target.value)}
                        className='h-12'
                    />
                </div>
                <Button
                    className='flex gap-2'
                    onClick={() =>
                         setOpen(
                         <CustomModal
                            title='Add a team member'
                            subheading='Send an invitation'
                         >
                            {modalChildren}
                         </CustomModal>)}
                >
                    {actionButtonText}
                </Button>
            </div>
        </>
    )
}