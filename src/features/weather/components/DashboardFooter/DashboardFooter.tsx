import { useEffect, useState } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { Box, Container, Link, Stack, Typography } from '@mui/material'

import nadinLogo from '@/assets/branding/nadin-logo.png'
import { getDateTimeFormatter } from '@/i18n/getDateTimeFormatter'
import { useI18n } from '@/i18n/useI18n'
import { dashboardFooterColors } from '@/theme/tokens'
import { useAppTheme } from '@/theme/useAppTheme'

const contactEmail = 'info@nadin.ir'

function FooterDateTime() {
  const { language } = useI18n()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let timer: number
    function update() {
      const current = new Date()
      setNow(current)
      timer = window.setTimeout(update, 60_000 - (current.getTime() % 60_000))
    }
    update()
    return () => window.clearTimeout(timer)
  }, [])

  const time = getDateTimeFormatter(language, 'localTime').format(now)
  const date = getDateTimeFormatter(language, 'localDate').format(now)

  return (
    <Stack
      component="time"
      dateTime={now.toISOString()}
      direction="row"
      alignItems="center"
      gap={1}
    >
      <CalendarMonthOutlinedIcon fontSize="small" />
      <span>
        <bdi dir="ltr">{time}</bdi> · {date}
      </span>
    </Stack>
  )
}

export function DashboardFooter() {
  const { mode } = useAppTheme()
  const { t } = useI18n()
  const colors = dashboardFooterColors[mode]

  return (
    <Box
      component="footer"
      sx={{ width: '100%', background: colors.background, color: colors.text, fontSize: 14 }}
    >
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          maxWidth: 1440,
          height: { xs: 'auto', lg: 106 },
          minHeight: 106,
          py: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Box
            component="img"
            src={nadinLogo}
            alt=""
            width={48}
            height={48}
            sx={{ flexShrink: 0 }}
          />
          <Typography component="small" variant="inherit">
            {t('dashboard.copyright')}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" flexWrap="wrap" columnGap={4} rowGap={1.5}>
          <Link
            href={`mailto:${contactEmail}`}
            color="inherit"
            underline="hover"
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
          >
            <MailOutlineIcon fontSize="small" />
            <span>
              {t('dashboard.contact')} <bdi dir="ltr">{contactEmail}</bdi>
            </span>
          </Link>
          <FooterDateTime />
        </Stack>
      </Container>
    </Box>
  )
}
