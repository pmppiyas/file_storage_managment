import mongoose from 'mongoose';
import { formatFileSize } from '../../utils/formetFileSize';
import { File } from '../file/file.model';

const getStorageStats = async (userId: string) => {
  const TOTAL_LIMIT = 512 * 1024 * 1024;

  const stats = await File.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: '$fileType',
        count: { $sum: 1 },
        totalSize: { $sum: '$size' },
      },
    },
  ]);

  const totalUsed = stats.reduce((acc, curr) => acc + curr.totalSize, 0);

  return {
    totalLimit: formatFileSize(TOTAL_LIMIT),
    used: formatFileSize(totalUsed),
    available: formatFileSize(Math.max(0, TOTAL_LIMIT - totalUsed)),
    breakdown: stats.map((item) => ({
      type: item._id,
      count: item.count,
      size: formatFileSize(item.totalSize),
    })),
  };
};

export const MetaServices = {
  getStorageStats,
};
