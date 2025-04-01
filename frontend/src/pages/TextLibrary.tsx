import { useState } from 'react';
import {
  FolderIcon,
  DocumentIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface Folder {
  id: number;
  name: string;
  documents: Document[];
  subfolders: Folder[];
}

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  lastModified: string;
}

export default function TextLibrary() {
  const [expandedFolders, setExpandedFolders] = useState<number[]>([]);

  const library: Folder[] = [
    {
      id: 1,
      name: '项目文档',
      documents: [
        {
          id: 1,
          name: '项目计划书.docx',
          type: 'docx',
          size: '2.4 MB',
          lastModified: '2024-03-31 14:30',
        },
        {
          id: 2,
          name: '需求分析.pdf',
          type: 'pdf',
          size: '1.8 MB',
          lastModified: '2024-03-30 16:45',
        },
      ],
      subfolders: [
        {
          id: 2,
          name: '会议记录',
          documents: [
            {
              id: 3,
              name: '周会纪要.docx',
              type: 'docx',
              size: '256 KB',
              lastModified: '2024-03-29 10:00',
            },
          ],
          subfolders: [],
        },
      ],
    },
    {
      id: 3,
      name: '技术文档',
      documents: [
        {
          id: 4,
          name: 'API文档.md',
          type: 'md',
          size: '128 KB',
          lastModified: '2024-03-28 09:15',
        },
      ],
      subfolders: [],
    },
  ];

  const toggleFolder = (folderId: number) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId]
    );
  };

  const renderFolder = (folder: Folder) => {
    const isExpanded = expandedFolders.includes(folder.id);

    return (
      <div key={folder.id} className="ml-4">
        <button
          onClick={() => toggleFolder(folder.id)}
          className="flex items-center text-gray-700 hover:text-primary-600"
        >
          <ChevronRightIcon
            className={`h-4 w-4 mr-1 ${
              isExpanded ? 'transform rotate-90' : ''
            }`}
          />
          <FolderIcon className="h-5 w-5 mr-2" />
          <span>{folder.name}</span>
        </button>

        {isExpanded && (
          <div className="ml-4 mt-2">
            {folder.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center text-gray-600 hover:text-primary-600 py-1"
              >
                <DocumentIcon className="h-5 w-5 mr-2" />
                <span>{doc.name}</span>
                <span className="ml-4 text-sm text-gray-500">{doc.size}</span>
                <span className="ml-4 text-sm text-gray-500">
                  {doc.lastModified}
                </span>
              </div>
            ))}
            {folder.subfolders.map((subfolder) => renderFolder(subfolder))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">文本库</h1>
          <p className="mt-2 text-sm text-gray-700">
            浏览和管理您的文档库
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            新建文件夹
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {library.map((folder) => renderFolder(folder))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 