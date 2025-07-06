def logSerializeObj(log):
    return {
        "log_id": log.log_id,
        "log_level": log.log_level,
        "message": log.message,
        "module": log.module,
        "target": log.target,
        "timestamp": log.timestamp.isoformat(),
    }
