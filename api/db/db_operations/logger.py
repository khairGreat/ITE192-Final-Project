from db.model.log import Logs
from sqlalchemy import text
from db.session import get_session
from datetime import datetime
from utility.logSerializeObj import logSerializeObj


# ? LIST OF LOGS

def get_logs():
    try:
        with get_session() as session:
            session.execute(text("USE log;"))  # switch to the correct DB
            logs = session.query(Logs).all()

            return {
                "success": True,
                "data": [
                    logSerializeObj(log) for log in logs
                ],
            }

    except Exception as e:
        return {"success": False, "error": str(e)}


# ? CREATE LOG
def create_log(
    log_level: str,
    target: str,
    message: str,
    module=None,
):
    with get_session() as session:
        log = Logs(
            log_level=log_level,
            message=message,
            module=module,
            target=target,
            timestamp=datetime.utcnow(),
        )
        session.add(log)


log_operations = {"logs": get_logs, "create_log": create_log}
