import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { toast } from 'sonner';
import { Role, Grade } from '@prisma/client';
import { EditUserDialog } from './edit-user-dialog';

interface DataTableRowActionsProps {
  row: {
    id: string;
    email: string;
    name: string | null;
    role: Role;
    grade: Grade;
    createdAt: string;
  };
  onSuccess: () => void;
}

export function DataTableRowActions({
  row,
  onSuccess
}: DataTableRowActionsProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <div className='flex items-center gap-2'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setShowEditDialog(true)}
            >
              <Pencil className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit User</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <EditUserDialog
        user={row}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSuccess={() => {
          setShowEditDialog(false);
          onSuccess();
        }}
      />
    </div>
  );
}
