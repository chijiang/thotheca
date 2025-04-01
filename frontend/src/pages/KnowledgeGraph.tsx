import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: '技术', value: 35 },
  { name: '业务', value: 25 },
  { name: '管理', value: 20 },
  { name: '市场', value: 15 },
  { name: '其他', value: 5 },
];

export default function KnowledgeGraph() {
  const [selectedView, setSelectedView] = useState<'graph' | 'chart'>('graph');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">知识图谱</h1>
          <p className="mt-2 text-sm text-gray-700">
            可视化您的知识结构和数据关系
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <div className="flex space-x-4">
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium ${
                selectedView === 'graph'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedView('graph')}
            >
              图谱视图
            </button>
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium ${
                selectedView === 'chart'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedView('chart')}
            >
              统计图表
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {selectedView === 'graph' ? (
              <div className="h-[600px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-500">知识图谱可视化区域</p>
                  <p className="text-sm text-gray-400 mt-2">
                    这里将展示交互式的知识图谱
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-[600px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="value"
                      fill="#0ea5e9"
                      name="知识分布"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              总知识节点
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">1,234</dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              关系数量
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">3,456</dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              知识覆盖率
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">85%</dd>
          </div>
        </div>
      </div>
    </div>
  );
} 