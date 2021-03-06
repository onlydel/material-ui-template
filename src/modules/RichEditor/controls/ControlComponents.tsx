/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Divider from '@material-ui/core/Divider';
import BlankControls from './BlankControls';
import UndoRedoControls from './UndoRedoControls';
import HeadingStyleControls from './HeadingStyleControls';
import BlockStyleControls from './BlockStyleControls';
import AlignmentControls from './AlignmentControls';
import InlineStyleControls from './InlineStyleControls';
import MultiLanguageControls from './MultiLanguageControls';
import ExtensionControls from './ExtensionControls';
import LinkControls from './LinkControls';
import ImageControls from './ImageControls';
import TableControls from './TableControls';
import CodeDirectorControls from './CodeDirectorControls';

import { EditorControlsProps } from './types';
import RealGridControls from './RealGridControls';

interface Props extends EditorControlsProps {
  readOnly: boolean;
  name: string;
}

/**
 * control의 이름으로 해당 컨트롤을 찾아온다.
 * Divider는 React.FC로 처리
 */
const Map: { [kay: string]: React.FC | React.FC<EditorControlsProps> } = {
  UndoRedo: UndoRedoControls,
  HeadingStyle: HeadingStyleControls,
  BlockStyle: BlockStyleControls,
  Alignment: AlignmentControls,
  InlineStyle: InlineStyleControls,
  MultiLanguage: MultiLanguageControls,
  Extension: ExtensionControls,
  Link: LinkControls,
  Image: ImageControls,
  Table: TableControls,
  RealGrid: RealGridControls,
  CodeDirector: CodeDirectorControls,
  Divider,
};

const ControlComponents: React.FC<Props> = (props) => {
  const { name } = props;
  const Compo = Map[name];

  /** config에 정의된 컨트롤중 해당 이름의 컨트롤이 없으면 기본 컨트롤 렌더링  */
  if (!Compo) return <BlankControls {...props} />;

  return <Compo {...props} />;
};

export default ControlComponents;
