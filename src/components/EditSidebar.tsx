import React from 'react';
import Router from 'next/router';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { Hidden, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlined from '@material-ui/icons/RemoveCircleOutlineOutlined';
import ControlPointDuplicateOutlined from '@material-ui/icons/ControlPointDuplicateOutlined';
import LoupeOutlined from '@material-ui/icons/LoupeOutlined';

import { ComponentBaseProps } from './types';
import BrandLogo from './BrandLogo';
import EditTocTreeView from './EditTocTreeView';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    overflowY: 'hidden',
    [theme.breakpoints.up('md')]: {
      width: theme.custom.sidebarWidthEdit,
      flexShrink: 0,
    },
  },
  toolbar: {
    minHeight: theme.custom.headerHeightHome,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  drawerPaper: {
    width: theme.custom.sidebarWidthEdit,
  },
  treeHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  rotate90: {
    transform: 'rotate(90deg)',
  },
}));

export interface EditSidebarProps extends ComponentBaseProps {
  onTreeNodeClick: (id: string) => void;
}

const EditSidebar: React.FC<EditSidebarProps> = (props) => {
  const classes = useStyles();
  const { onTreeNodeClick } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNode = (id: string) => {
    onTreeNodeClick(id);
  };

  const documentToc = (
    <div>
      <Toolbar className={classes.toolbar}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12}>
            <BrandLogo imageName="logo-title-f2f3f8.png" />
          </Grid>
        </Grid>
        <IconButton
          aria-label="display more actions"
          edge="end"
          color="inherit"
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => Router.push('/projects/settings')}>프로젝트 설정</MenuItem>
          <Divider variant="middle" light />
          <MenuItem onClick={() => Router.push('/projects')}>프로젝트 목록</MenuItem>
          <MenuItem onClick={() => Router.push('/profiles')}>계정 설정</MenuItem>
          <MenuItem onClick={() => Router.push('/logout')}>로그아웃</MenuItem>
        </Menu>
      </Toolbar>
      <div className={classes.treeHeader}>
        <Grid container spacing={0}>
          <Grid item xs />
          <Grid item>
            <IconButton
              size="small"
              color="primary"
              aria-label="add child"
              className={classes.rotate90}
            >
              <ControlPointDuplicateOutlined />
            </IconButton>
            <IconButton size="small" color="primary" aria-label="add">
              <AddCircleOutlineOutlined />
            </IconButton>
            <IconButton size="small" color="primary" aria-label="delete">
              <RemoveCircleOutlineOutlined />
            </IconButton>
          </Grid>
        </Grid>
      </div>
      <EditTocTreeView onClickNode={handleClickNode} />
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="folders">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {documentToc}
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {documentToc}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default EditSidebar;
