import { useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

export default function TextUpload() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // TODO: Handle file upload
      console.log('Files dropped:', files);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          文本上传
        </h2>
        <p className="mt-3 text-lg text-gray-500">
          上传您的文本文件，我们将帮助您管理和分析内容
        </p>
      </div>

      <div className="mt-10">
        <div
          className={`relative rounded-lg border-2 border-dashed p-12 text-center ${
            dragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-500'
          }`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CloudArrowUpIcon
            className="mx-auto h-12 w-12 text-gray-400"
            aria-hidden="true"
          />
          <div className="mt-4">
            <label
              htmlFor="file-upload"
              className="cursor-pointer rounded-md bg-white font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
            >
              <span>上传文件</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept=".txt,.doc,.docx,.pdf"
              />
            </label>
            <p className="pl-1">或拖放文件到此处</p>
          </div>
          <p className="text-xs leading-5 text-gray-500 mt-2">
            支持 TXT, DOC, DOCX, PDF 格式
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-medium text-gray-900">最近上传</h3>
        <div className="mt-4">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    文件名
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    大小
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    上传时间
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    状态
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    示例文件.txt
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    1.2 MB
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    2024-03-31 14:30
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      已完成
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 