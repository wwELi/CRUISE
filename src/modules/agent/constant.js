
import windows_path from '@assets/images/windows.png';
import cent_os_path from '@assets/images/cent_os.png';
import suse_path from '@assets/images/suse.png';
import ubuntu_path from '@assets/images/ubuntu.png';
import debin_path from '@assets/images/debin.png';

export const OS_ICON_PATH = {
  windows: windows_path,
  centos: cent_os_path,
  suse: suse_path,
  ubuntu: ubuntu_path,
  debian: debin_path
};


export const STATUS_COLORS = {
  building: '#ff9a2a',
  idle: '#7fbc39'
};

export const TABS = [
  { key: 'all', name: 'All' },
  { key: 'virtual', name: 'Virtual' },
  { key: 'physical', name: 'Physical' }
];
