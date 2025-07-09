import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import { Box, ButtonLink } from '../../../component-library';
import {
  getMultipleTargetsSubjectMetadata,
  getSnapsMetadata,
} from '../../../../selectors';
import {
  BlockSize,
  Display,
  FlexDirection,
  JustifyContent,
} from '../../../../helpers/constants/design-system';
import {
  MinPermissionAbstractionDisplayCount,
  PermissionsAbstractionThreshold,
  PermissionWeightThreshold,
} from '../../../../../shared/constants/permissions';
import {
  getFilteredSnapPermissions,
  getSnapName,
} from '../../../../helpers/utils/util';
import { getWeightedPermissions } from '../../../../helpers/utils/permission';
import SnapPermissionAdapter from '../snap-permission-adapter';

export default function SnapPermissionsList({
  snapId,
  snapName,
  permissions = {},
  connections = {},
  showOptions = false,
  showAllPermissions = false,
  onShowAllPermissions = () => {},
}) {
  const t = useI18nContext();

  
    const combinedPermissions = useMemo(
      () => ({ ...permissions, connection_permission: connections }),
      [permissions, connections],
    );

  
    const targetSubjectsMetadata = useSelector((state) =>
      getMultipleTargetsSubjectMetadata(state, connections),
    );

  
    const snapsMetadata = useSelector(getSnapsMetadata);

  
    const weightedPermissions = useMemo(
      () =>
        getWeightedPermissions({
          t,
          permissions: combinedPermissions ,
          subjectName: snapName ,
          getSubjectName: getSnapName(snapsMetadata),
        }),
      [t, combinedPermissions, snapName, snapsMetadata],
    );

  
    const [showAll, setShowAll] = useState(
      showAllPermissions ||
        Object.keys(weightedPermissions).length <= PermissionsAbstractionThreshold ,
    );

  
    const filteredPermissions = useMemo(
      () =>
        getFilteredSnapPermissions(
          weightedPermissions ,
          PermissionWeightThreshold.snapInstall ,
          MinPermissionAbstractionDisplayCount ,
        ),
      [weightedPermissions],
    );

  
    const onShowAllHandler = () => {
      onShowAllPermissions();
      setShowAll(true);
    };

 
   return (
     <Box display={Display.Flex} flexDirection={FlexDirection.Column} width={BlockSize.Full}>
       <Box className="snap-permissions-list" width={BlockSize.Full}>
         <SnapPermissionAdapter
           permissions={showAll ? weightedPermissions : filteredPermissions}
           snapId={snapId}
           snapName={snapName}
           showOptions={showOptions}
           targetSubjectsMetadata={targetSubjectsMetadata}
         />
       </Box>
       {!showAll && (
         <Box display={Display.Flex} justifyContent={JustifyContent.center} paddingTop={2} paddingBottom={2}>
           <ButtonLink onClick={onShowAllHandler}>{t('seeAllPermissions')}</ButtonLink>
         </Box>
       )}
     </Box>
   );
 }

 SnapPreferencesList.propTypes={
   snapId: PropTypes.string.isRequired,snapName: PropTypes.string.isRequired,permissions:PropTypes.object,isRequired ,connections:PropTypes.object ,showOptions:PropTypes.bool ,showallpermissions : PropTypes.bool,onshowallpermissions : PropTypes.func };
